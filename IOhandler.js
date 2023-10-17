/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date: October 17, 2023
 * Author: Justin Pua
 *
 */

const unzipper = require("unzipper"),
  AdmZip = require("adm-zip"),
  fs = require("fs").promises,
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
        reject();
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
const readDir = (dir) => {};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {};

module.exports = {
  unzip,
  oldunzip,
  readDir,
  grayScale,
};
