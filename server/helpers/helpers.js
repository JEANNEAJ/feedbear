import { format } from "util";
import { v4 as uuidv4 } from "uuid";
import gc from "../config/index.js";
const bucket = gc.bucket("feedbear"); // should be your bucket name

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

export const uploadImage = (file) =>
  new Promise((resolve, reject) => {
    const { buffer, mimetype } = file;

    // give the file a random, unique name using UUID
    const blob = bucket.file(uuidv4());
    const blobStream = blob.createWriteStream({
      // set the appropriate MIME type
      metadata: { contentType: mimetype },
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        resolve(publicUrl);
      })
      .on("error", (err) => {
        console.log(err);
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });
