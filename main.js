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

// oldunzip(zipFilePath,pathUnzipped).then(()=>{
//     readDir(pathUnzipped).then((pngFiles)=>{
//         //console.log(pngFiles);
//         pngFiles.forEach((png) => {
//           //console.log(path.join(pathUnzipped,png))
//           grayScale(path.join(pathUnzipped,png),path.join(pathProcessed,png))
//         });

//       })
// })
unzip(zipFilePath,pathUnzipped).then(() => {
    console.log('Succesfully Unzip');
  })
  .catch((err) => {
    console.error('Error:', err);
  });