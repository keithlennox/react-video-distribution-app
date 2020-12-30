/*
This file contains the CRUD operations for the video archive.
If we change to a new archive, just update these CRUD operations.
The function names / parameters and return values should remain the same.
*/

const axios = require('axios');

//SUBMIT RESTORE JOB
exports.submitRestoreJob = async (video_id) => {

  //Call Vantage
  let restore_job = await axios.post(
    "http://xxxxxxxxxx/Rest/Workflows/xxxxxxxxxx/Submit", 
    {
      "Attachments": [],
      "JobName": "VDS Restore " + video_id,
      "Labels": [],
      "Medias": [{
              "Identifier": "xxxxxxxxxx",
              "Data": "",
              "Description": "The original version of content encountered or created by Vantage.",
              "Files": ["F://klennox/VDS2/Archive/source.mxf"],
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
  return restore_job.data.JobIdentifier;
}


//CHECK RESTORE STATUS
exports.checkRestoreStatus = async (restore_id) => {

  //Call Vantage
  let restore_job = await axios.get("http://xxxxxxxxxx/Rest/Jobs/" + restore_id);
  return restore_job.data.Job.State; //Vantage job status (see values below)
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

//CHECK RESTORE PROGRESS
exports.checkRestoreProgress = async (restore_id) => {

  //Call Vantage
  let restore_progress = await axios.get("http://xxxxxxxxxx/Rest/Jobs/" + restore_id + "/Progress");
  return restore_progress.data.JobProgress;

}