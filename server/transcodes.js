/*
This file contains the CRUD operations for the transcoding platform (currently Vantage)
If we change to a new transcoding platform, just update these CRUD operations.
The function names / parameters and return values should remain the same.
*/

const axios = require('axios');

//SUBMIT TRANSCODE JOB
exports.submitEncoderJob = async (transcoder_workflow_id, video_id) => {

  //Call Vantage
  let transcode_job = await axios.post(
    "http://xxxxxxxxxx/Rest/Workflows/" + transcoder_workflow_id + "/Submit", 
    {
      "Attachments": [],
      "JobName": "VDS Restore " + video_id,
      "Labels": [],
      "Medias": [{
              "Identifier": "xxxxxxxxxx",
              "Data": "",
              "Description": "The original version of content encountered or created by Vantage.",
              "Files": ["F://klennox/VDS2/SAN/" + video_id + ".mxf"],
              "Name": "Original"
          }
      ],
      "Priority": 0,
      "Variables": [{
              "Identifier": "xxxxxxxxxx",
              "DefaultValue": "",
              "Description": "PROD - The source video file name excluding the extension.",
              "Name": "Original Base Name",
              "TypeCode": "string",
              "Value": video_id
          }
      ]
    }
  );
  return transcode_job.data.JobIdentifier;
}


//CHECK TRANSCODE STATUS
exports.checkEncoderStatus = async (transcode_job_id) => {

  //Call Vantage
  let transcode_job = await axios.get("http://xxxxxxxxxx/Rest/Jobs/" + transcode_job_id);
  return transcode_job.data.Job.State; //Vantage job status (see values below)
  /*
  Vantage job status values:
  0=Active
  1=Stopping
  2=Pausing
  3=Paused
  4=Failed
  5=Complete
  6=Waiting
  7=StoppedByUser
  8=WaitingToRetry
  9=ErrorsDetected
 */
}

//CHECK TRANSCODE PROGRESS
exports.checkEncoderProgress = async (transcode_job_id) => {

  //Call Vantage
  let transcode_progress = await axios.get("http://xxxxxxxxxx/Rest/Jobs/" + transcode_job_id + "/Progress");
  let adjusted_progress = transcode_progress.data.JobProgress * .8;
  return Math.trunc(adjusted_progress); //Remove decimal places, either this or change the datatype on the db column.
}