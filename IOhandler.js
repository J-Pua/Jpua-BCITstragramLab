/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: October 17, 2023
 * Author: Justin Pua
 *
 */

const { error } = require("console");

const unzipper = require("unzipper"),
  AdmZip = require("adm-zip"),
  fs = require("fs"),
  { createReadStream, createWriteStream } = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  const zip = new AdmZip(pathIn);
  return new Promise((resolve, reject) => {
    zip.extractAllToAsync(pathOut, true, false, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
const oldunzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    const source = createReadStream(pathIn);

    source
      .pipe(unzipper.Extract({ path: pathOut }))
      .on("close", () => resolve())
      .on("error", (err) => reject(err));
  });
};
/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (dir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      }
      const pngFiles = files.filter((file) => file.endsWith('.png'));
      resolve(pngFiles);})
  });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  fs.promises.mkdir(path.dirname(pathOut),{recursive:true}).then(()=>{
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
    .pipe(new PNG({filterType:4}))
    .on('parsed', function() {
      const grayImage = new PNG({ width: this.width, height: this.height });

      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const idx = (this.width * y + x) << 2;
          const value = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
          grayImage.data[idx] = value;
          grayImage.data[idx + 1] = value;
          grayImage.data[idx + 2] = value;
          grayImage.data[idx + 3] = 255; // Set alpha channel to fully opaque
        }
      }

       grayImage
        .pack()
        .pipe(fs.createWriteStream(pathOut))
        .on('finish',()=> {
          // console.log(`Grayscale image saved to ${pathOut}`)
          resolve()
        })
        .on('error',(err)=>{reject(err)});
    });


  })})};


module.exports = {
  unzip,
  oldunzip,
  readDir,
  grayScale,
};
