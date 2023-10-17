const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date: October 17,2023
 * Author:Justin Pua
 *
 */

const {unzip,oldunzip,readDir,grayScale} = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");
oldunzip(zipFilePath,pathUnzipped).then(() => {
    console.log('Succesfully Unzip');
  })
  .catch((err) => {
    console.error('Error:', err);
  });