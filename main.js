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
const { unzip, oldunzip, readDir, grayScale } = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");

// oldunzip(zipFilePath, pathUnzipped)
// //   .then(() => {
// //     console.log("Succesfully Unzip");
// //   })
//   .then(()=>{
//     return readDir(pathUnzipped)}
//   )
//   .then((filtered) => {
//       filtered.forEach((picture) => {
//         // console.log(path.join(pathUnzipped, picture));
//         grayScale(path.join(pathUnzipped,picture),path.join(pathProcessed,picture));
//       })
//   })
//   .catch((err) => {
//     console.error("Error:", err);
//   });
unzip(zipFilePath, pathUnzipped)
//   .then(() => {
//     console.log("Succesfully Unzip");
//   })
  .then(()=>{
    return readDir(pathUnzipped)}
  )
  .then((filtered) => {
      const promiselist = filtered.map((picture) => {
        // console.log(path.join(pathUnzipped, picture));
        return grayScale(path.join(pathUnzipped,picture),path.join(pathProcessed,picture));
      })
      Promise.all(promiselist)
  })
  .catch((err) => {
    console.error("Error:", err);
  });
