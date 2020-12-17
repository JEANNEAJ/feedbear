import { format } from "util";
import { v4 as uuidv4 } from "uuid";
import gc from "../config/index.js";
const bucket = gc.bucket("feedbear"); // should be your bucket name

/**
 * @description Deletes the specified resource from our Google Cloud bucket.
 * @param {string}  url URL of the resource being deleted
 * @throws if delete operation fails
 */
export const deleteImage = async (url) => {
  const uuid = url.slice(-36);
  try {
    await bucket.file(uuid).delete();
  } catch (error) {
    throw new Error("File deletion failed");
  }
};

/**
 * @description - Accepts an object with keys "buffer" and "mimetype" as and
 *   uploads it to our image bucket on Google Cloud. If { existingURL } is
 *   provided, the resource at { existingURL } is overwritten.
 * @param {object} file object that will be uploaded
 * @param {string} existingURL URL of resource being replaced
 * @returns {Promise<string>} Promise object represents the URL of the uploaded
 *   file.
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
