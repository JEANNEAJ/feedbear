import { format } from "util";
import { v4 as uuidv4 } from "uuid";
import gc from "../config/index.js";
const bucket = gc.bucket("feedbear"); // should be your bucket name

/**
 *
 * @param { File } object file object that will be uploaded
 * @param { existingURL } string URL of resource being replaced
 * @description Accepts an object with keys "buffer" and "mimetype" as and
 *   uploads it to our image bucket on Google Cloud. If { existingURL } is
 *   provided, the resource at { existingURL } is overwritten.
 */
export const uploadImage = async (file, existingURL = null) => {
  return new Promise((resolve, reject) => {
    const filename = existingURL ? existingURL.slice(-36) : uuidv4();
    const { buffer, mimetype } = file;

    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream({
      // set the appropriate MIME type
      metadata: {
        cacheControl: "no-cache, max-age=0, no-transform",
        contentType: mimetype,
      },
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );
        console.log(`Successfully uploaded file to ${publicUrl}`);
        resolve(publicUrl);
      })
      .on("error", (err) => {
        console.log(err);
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });
};
