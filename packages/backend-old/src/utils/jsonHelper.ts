/* eslint-disable func-names */
import fs from "fs";
import https from "https";

export const readJson = <T>(filename: string): T => {
  const rawdata = fs.readFileSync(filename);
  return JSON.parse(rawdata.toString());
};

export const writeJson = <T>(filename: string, data: T): void => {
  const dataStr = JSON.stringify(data);
  fs.writeFileSync(filename, dataStr);
};

export const downloadJson = (
  filename: string,
  endpoint: string
): Promise<void> =>
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
        // eslint-disable-next-line no-console
        console.log(err.message);
        fs.unlink(filename, reject);
      });
  });
