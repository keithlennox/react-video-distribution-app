/*
This file contains the CRUD operations for each platform.
To add a new platform, first add CRUD functions for the platform to this file.
The naming convention should be as follows:
  createVideoXX()
  checkVideoXX()
  updateVideoXX()
  deleteVideoXX()
Replace XX with a 2 letter code to represent that platform.
In the Admin screen / Platforms tab, add the appropriate information for the platform,
including the 2 letter code in the Group column.
*/

const axios = require('axios');

//CREATE BRIGHTCOVE VIDEO
exports.createVideoBC = async (video_id, account, title, description) => {

  const cms_body = {
    "name": title,
    "long_description": description,
    "reference_id": "VDS" + video_id,
  }
  
  const di_body = {
    "master": {
      "url": "https://xxxxxxxxxx" + video_id + ".mp4"
    },
    "profile": "xxxxxxxxxx",
    "capture-images": true,
  }

  //Get token
  let options = await getBCToken();

  //Create video
  try {

    //Create CMS record
    let cms_result = await axios.post("https://xxxxxxxxxx" + account + "/videos", cms_body, options)
    //console.log(cms_result.data.id);

    //Ingest video
    let di_result = await axios.post("https://xxxxxxxxxx" + account + "/videos/" + cms_result.data.id + "/ingest-requests", di_body, options)
    //console.log(di_result.data.id);
    return cms_result.data.id;
    
  }catch(error){
    console.log(error);
  }
}


//CHECK BRIGHTCOVE VIDEO
exports.checkVideoBC = async (account, instance_job_id) => {
  
  try {

    //Get token
    let options = await getBCToken();

    let cms_result = await axios.get("https://xxxxxxxxxx" + account + "/videos/" + instance_job_id, options)
    //console.log(cms_result);
    return cms_result.data.complete;

  }catch(error){
    console.log(error);
  }
}


//UPDATE BRIGHTCOVE VIDEO
exports.updateVideoBC = async (instance_job_id, account, publish_start, publish_end) => {
  
  try {

    //Get token
    let options = await getBCToken();

    const cms_body = {
      "schedule": {
        "ends_at": publish_end,
        "starts_at": publish_start
      }
    }

    let cms_result = await axios.patch("https://xxxxxxxxxx" + account + "/videos/" + instance_job_id, cms_body, options)
    //console.log(cms_result);


  }catch(error){
    console.log(error);
  }
}


//CREATE OMNYSTUDIO VIDEO (PLACEHOLDER)
exports.createVideoOM = async (video_id, account, title, description) => {

  //Create video
  try {
    return 1111111111;
  }catch(error){
    console.log(error);
  }
}


//CHECK OMNYSTUDIO VIDEO (PLACEHOLDER)
exports.checkVideoOM = async (account, instance_job_id) => {
  
  try {
    return true;
  }catch(error){
    console.log(error);
  }
}


//UPDATE OMNYSTUDIO VIDEO (PLACEHOLDER)
exports.updateVideoOM = async (instance_job_id, account, publish_start, publish_end) => {
  
  try {
    return 1111111111
  }catch(error){
    console.log(error);
  }
}


//CREATE YOUTUBE VIDEO (PLACEHOLDER)
exports.createVideoYT = async (video_id, account, title, description) => {

  //Create video
  try {
    return 1111111111;
  }catch(error){
    console.log(error);
  }
}


//CHECK YOUTUBE VIDEO (PLACEHOLDER)
exports.checkVideoYT = async (account, instance_job_id) => {
  
  try {
    return true;
  }catch(error){
    console.log(error);
  }
}


//UPDATE YOUTUBE VIDEO (PLACEHOLDER)
exports.updateVideoYT = async (instance_job_id, account, publish_start, publish_end) => {
  
  try {
    return 1111111111
  }catch(error){
    console.log(error);
  }
}


//HELPER FUNCTIONS

//GET BRIGHTCOVE TOKEN
const getBCToken = async () => {

  //Set vars
  const client_id = "xxxxxxxxxx";
  const client_secret = "xxxxxxxxxx";
  var auth_string = new Buffer(client_id + ":" + client_secret).toString('base64');
  const oauth_body = "grant_type=client_credentials";
  const oauth_options = {
    headers: {
      'Authorization': 'Basic ' + auth_string,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  //Get token
  try {
    let oauth_result = await axios.post("https://xxxxxxxxxx", oauth_body, oauth_options)
    let options = {
      headers: {
        'Authorization': 'Bearer ' + oauth_result.data.access_token,
        'Content-type' : 'application/json'
      }
    }
    return options;
  }catch(error){
    console.log(error);
  }
}