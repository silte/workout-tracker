const fs = require("fs");
const https = require("https");

const readJson = (filename) => {
  let rawdata = fs.readFileSync(filename);
  return JSON.parse(rawdata);
};

const writeJson = (filename, data) => {
  let dataStr = JSON.stringify(data);
  fs.writeFileSync(filename, dataStr);
};

const downloadJson = (filename, endpoint) =>
  new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    https
      .get(endpoint, function (response) {
        response.pipe(file);
        file.on("finish", function () {
          file.close();
          resolve();
        });
      })
      .on("error", function (err) {
        // Handle errors
        fs.unlink(filename);
        console.log(err.message);
        reject();
      });
  });

module.exports = {
  readJson,
  writeJson,
  downloadJson,
};
