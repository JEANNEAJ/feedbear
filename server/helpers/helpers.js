import { format } from "util";
import { v4 as uuidv4 } from "uuid";
import gc from "../config/index.js";
const bucket = gc.bucket("feedbear"); // should be your bucket name

/**
 *
 * @param { File } object file object that will be uploaded
 * @param { existingURL } String URL of resource being replaced
 * @description Accepts an object with keys "buffer" and "mimetype" as and
 *   uploads it to our image bucket on Google Cloud. If { existingURL } is
 *   provided, the resource at { existingURL } is deleted.
 */

export const uploadImage = async (file, existingURL = null) => {
  // if existingURL provided, extract UUID and delete the image
  if (existingURL) {
    try {
      const uuid = existingURL.slice(-36);
      const res = await bucket.file(uuid).delete();
      console.log(`File at ${existingURL} was deleted.`);
    } catch (err) {
      console.log(err);
    }
  }

  return new Promise((resolve, reject) => {
    const { buffer, mimetype } = file;

    const blob = bucket.file(uuidv4());
    const blobStream = blob.createWriteStream({
      // set the appropriate MIME type
      metadata: { contentType: mimetype },
      resumable: false,
    });
    blobStream
      .on("finish", () => {
        const publicUrl = format(
          `https://${bucket.name}.storage.googleapis.com/${blob.name}`
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
