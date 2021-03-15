import fs from "fs";
import https from "https";

export const readJson = (filename: string) => {
  let rawdata = fs.readFileSync(filename);
  return JSON.parse(rawdata.toString());
};

export const writeJson = (filename: string, data: object) => {
  let dataStr = JSON.stringify(data);
  fs.writeFileSync(filename, dataStr);
};

export const downloadJson = (filename: string, endpoint: string) =>
  new Promise<void>((resolve, reject) => {
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
        console.log(err.message);
        fs.unlink(filename, reject);
      });
  });