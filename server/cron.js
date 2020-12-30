/*
This file contains the CRON job for Video Delivery Solution (VDS).
There are actually three separate CRONS. One for restoring videos from the archive.
One for publishing content to external platforms (transcoding and publishing).
And one for scheduling content on external platforms.
To turn off the CRON, you can disable it in server.js.
The basic logic for each of the three crons is as follows:

SCHEDULE CRON
Get all schedule rows
Loop thru schedule rows
If schedule status = Requested
    If instance status = Null / Create instance job and set publish status = Requested
    If instance status = Requested / Do nothing
    If instance status = Transcoding / Do nothing
    If instance status = Publishing / Do nothing
    If instance status = Error / Set schedule status = Error (message)
    If instance status = Complete / Set schedule status = Ready
If schedule status = Ready / Check dates + set schedule status = Live or Complete
If schedule status = Live / Change schedule status = Complete
If schedule status = Error / Do nothing
If schedule status = Complete / Do nothing

INSTANCE CRON
Get all instance rows
Loop thru instance rows
If instance status = Requested
    If restore status = Null / Create restore job and set status = Requested
    If restore status = Restoring / Do nothing
    If restore status = Error / Set transcode status = Error (message)
    If restore status = Complete / Start transcode job and set instance status = Transcoding
If instance status = Transcoding
    If transcode job is in progress / do nothing
    If transcode job is complete / Start publish job and set instance status = Publishing
    If transcode job failed / Set instance status = Error (message)
If instance status = Publishing
    If instance job is in progress / do nothing
    If instance job failed / Set publish status = Error (message)
    If instance job is complete / set publish status = Complete
If instance status = Error / Do nothing
If instance status = Complete / Do nothing

RESTORE CRON
Get all restore rows
Loop thru restore rows
If restore status = Requested / Create restore job, start restore job, set restore status = Restoring
If restore status = Restoring
    If restore job is in progress / do nothing
    If restore job failed / Set restore status = Error (message)
    If restore job is complete / set restore status = Complete
If restore status = Error / Do nothing
If restore status = Complete / Do nothing

ADDITIONAL CRON FUNCTIONALITY REQUIRED
Ability to handle and log errors
Ability for end user to manually delete restore, publish, and schedule jobs that have failed
Ability to auto delete completed restore files (based on timestamp)
Ability to check storage space before restoring (place restore on hold until space available)
Ability to provide more detailed status, such as progress bar or %.
Ability to auto upload of CC and DV
Ability to auto delete completed instances (based on rights)
Simplify db calls (can we combine multiple calls into one?)
Run 3 separate CRON jobs to speed things up?
Other code cleanup?
What about finding a node.js package that can handle job queues?
What happens if the cron runs again before the previous cron is complete? Should the cron set a flag to indicate it's done. If not done, the cron is skipped.
The initial publish to Brightcove should NOT be live forever. This MUST be fixed.

NOTES
You cannot use forEach() or map() to loop thru our tables becuase they ignore async/await.
For additional info, visit:
https://www.coreycleary.me/why-does-async-await-in-a-foreach-not-actually-await
*/

const cron = require('node-cron');
const knex = require('knex');
const axios = require('axios');
const restores = require('./restores');
const transcodes = require('./transcodes');
const instances = require('./instances');

//Create db connection
const db = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'xxxxxxxxxx',
    password: 'xxxxxxxxxx',
    database: 'vds_kl'
  }
});

//CRON
cron.schedule('* * * * *', async () => {

  console.log('CRON TRIGGERED ' + new Date())

  //Process schedules
  let schedules = await db('schedules').whereNot('status','Complete').whereNot('status','Error').select('*')
  for (const schedule of schedules) { //You cannot use forEach() or map() becuase they ignore async/await
    await processSchedule(schedule);
   }

  //Process instances
  let instances = await db('instances').whereNot('status','Complete').whereNot('status','Error').select('*')
  for (const instance of instances) {
    await processInstance(instance);
  }

  //Process restores
  let restores = await db('restores').whereNot('status','Complete').whereNot('status','Error').select('*')
  for (const restore of restores) {
    await processRestore(restore);
  }

})

//SCHEDULE (Requested, Error, Ready, Live, Complete)
const processSchedule = async (schedule) => {

   try {

    //IF SCHEDULE STATUS = "REQUESTED"
    if(schedule.status === "Requested") {
      
      //Get instance for this video
      let instance = await db('instances').where('video_id', schedule.video_id).where('platform', schedule.platform).select('*')

      //If instance does not exist, request it
      if(instance.length === 0) {
        await db('instances').insert({ video_id: schedule.video_id, platform: schedule.platform, created: new Date(), status: 'Requested', progress: 0 })

      //If instance complete, change schedule status to Ready
      }else if(instance[0].status === "Complete") {
        await db('schedules').where({schedule_id: schedule.schedule_id}).update({ status: "Ready" })
      }

    //IF SCHEDULE STATUS = "READY"
    }else if(schedule.status === "Ready") {

      //If the start date is in the past, update platform + db
      let now = new Date();
      let start = new Date(schedule.publish_start);
      if(start.getTime() < now.getTime()) { //If start is in the past
        let updatedSchedule = await db('schedules').where({schedule_id: schedule.schedule_id}).select('*') //Get any updates made by user since CRON started running
        if(updatedSchedule.length != 0) { //Make sure the schedule has not been deleted
          let updatedNow = new Date();
          let updatedStart = new Date(updatedSchedule[0].publish_start);
          if(updatedStart.getTime() < updatedNow.getTime()) { //If the user chnaged the start date, confirm it's in the past
            let platform = await db('platforms').where('platform', schedule.platform).select('account', 'grouping') //Get platform group
            let functionName = "updateVideo" + platform[0].grouping; //Add platform group to function name
            let instance_job_ids = await db('instances').where('video_id', schedule.video_id).where('platform', schedule.platform).select('instance_job_id') //Get the instance id, such as the brightcove id
            let instance_job_id = instance_job_ids[0].instance_job_id;
            await instances [functionName](instance_job_id, platform[0].account, updatedSchedule[0].publish_start, updatedSchedule[0].publish_end) //Call instance update function with dynamic function name
            await db('schedules').where({schedule_id: schedule.schedule_id}).update({ status: "Live" })
          }
        }
      }
 
    //IF SCHEDULE STATUS = "LIVE"
    }else if(schedule.status === "Live") {

      //If the end date is in the past, update db
      let now = new Date();
      let end = new Date(schedule.publish_end);
      if(end.getTime() < now.getTime()) {
        let updatedSchedule = await db('schedules').where({schedule_id: schedule.schedule_id}).select('*') //Get any updates made by user since CRON started running
        if(updatedSchedule.length != 0) { //Make sure the schedule has not been deleted
          let updatedNow = new Date();
          let updatedEnd = new Date(updatedSchedule[0].publish_end);
          if(updatedEnd.getTime() < updatedNow.getTime()) { //If the user chnaged the end date, confirm it's in the past
            let platform = await db('platforms').where('platform', schedule.platform).select('account', 'grouping') //Get platform group
            let functionName = "updateVideo" + platform[0].grouping; //Add platform group to function name
            let instance_job_ids = await db('instances').where('video_id', schedule.video_id).where('platform', schedule.platform).select('instance_job_id') //Get the instance id, such as the brightcove id
            let instance_job_id = instance_job_ids[0].instance_job_id;
            await instances[functionName](instance_job_id, platform[0].account, updatedSchedule[0].publish_start, updatedSchedule[0].publish_end) //Call instance update function with dynamic function name
            await db('schedules').where({schedule_id: schedule.schedule_id}).update({ status: "Complete" })
          }
        }
      }

    }

  }catch(error) {
    console.log(error);
  }

}

//INSTANCE (Requested, Transcoding, Publishing, Error, Complete)
const processInstance = async (instance) => {

  try {

    //IF INSTANCE STATUS = "REQUESTED"
    if(instance.status === "Requested") {
      
      //Get restore for this video
      let restore = await db('restores').where('video_id', instance.video_id).select('*') 
      
      //If restore does not exist, request it
      if(restore.length === 0) {
        await db('restores').insert({ video_id: instance.video_id, created: new Date(), status: 'Requested', progress: 0 })
        
      //If restore exists and is complete, start a transcode job
      }else if(restore[0].status === "Complete") {
        let encoder_workflow_ids = await db('platforms').where('platform', instance.platform).select('encoder_workflow_id') //Get encoder_workflow_id
        let encoder_workflow_id = encoder_workflow_ids[0].encoder_workflow_id;
        let encoder_job_id = await transcodes.submitEncoderJob(encoder_workflow_id, instance.video_id) //Start encoder job + get encoder_job_id
        await db('instances').where({ id: instance.id }).update({ status: "Transcoding",  encoder_job_id: encoder_job_id, progress: 10}) //Save encoder_job_id to db and set instance status to "Transcoding"
      }

    //IF INSTANCE STATUS = "TRANSCODING"
    }else if(instance.status === "Transcoding") {

      //Get transcode job progress + update db
      let encoder_job_progress = await transcodes.checkEncoderProgress(instance.encoder_job_id)
      await db('instances').where({ id: instance.id }).update({ progress: encoder_job_progress }) 

      //Get transcode job status
      let encoder_job_status = await transcodes.checkEncoderStatus(instance.encoder_job_id)
      
      //If transcode job is complete, start a publish job
      if(encoder_job_status === 5) {
        let video_metadata = await db('videos').where('id', instance.video_id).select('*') //Get video metadata
        let platform = await db('platforms').where('platform', instance.platform).select('account', 'grouping') //Get platform group
        let functionName = "createVideo" + platform[0].grouping; //Add platform group to function name
        let instance_job_id = await instances[functionName](video_metadata[0].id, platform[0].account, video_metadata[0].title, video_metadata[0].description) //Call instance create function with dynamic function name
        await db('instances').where({id: instance.id}).update({ instance_job_id: instance_job_id, status: "Publishing" })
        
      //If transcode job failed, set instance to Error
      }else if (encoder_job_status === 4) {
        await db('instances').where({ id: instance.id }).update({ status: "Error" }) 
      }

    //IF INSTANCE STATUS = "PUBLISHING"
    }else if(instance.status === "Publishing") {

      //Get instance job status
      let platform = await db('platforms').where('platform', instance.platform).select('account', 'grouping') //Get platform group
      let functionName = "checkVideo" + platform[0].grouping; //Add platform group to function name
      let instance_job_status = await instances[functionName](platform[0].account, instance.instance_job_id); //Call instance check function with dynamic function name
        
      //If instance job is complete, change instance status to complete
      if(instance_job_status === true) {
        await db('instances').where({ id: instance.id }).update({ status: "Complete", progress: 100})
      }

      //If instance job failed, change instance status to error
      // Code required here
  
    }

  }catch(error) {
    console.log(error);
  }

}

//RESTORE (Requested, Restoring, Error, Complete)
const processRestore = async (restore) => {
  
  try {

    //IF RESTORE STATUS = "REQUESTED"
    if(restore.status === "Requested") {
    
      //Start new restore job
      let restore_job_id = await restores.submitRestoreJob(restore.video_id);
      await db('restores').where({ video_id: restore.video_id }).update({ restore_job_id: restore_job_id, status: 'Restoring', progress: 10 })
  
    //IF RESTORE STATUS = "RESTORING"
    }else if(restore.status === "Restoring") {

      //Check restore job progress + update db
      let restore_job_progress = await restores.checkRestoreProgress(restore.restore_job_id);
      await db('restores').where({ video_id: restore.video_id }).update({ progress: restore_job_progress })

      //Check restore job status
      let restore_job_status = await restores.checkRestoreStatus(restore.restore_job_id);
      
      //If restore job is complete, change restore status to complete
      if(restore_job_status === 5) {
        await db('restores').where({ video_id: restore.video_id }).update({ status: "Complete", progress: 100 })
        
      //If restore job failed, chnage restore status to Error
      }else if (restore_job_status === 4) {
        await db('restores').where({ video_id: restore.video_id }).update({ status: "Error" })
      }
    }

  }catch(error){
    console.log(error);
  }
}