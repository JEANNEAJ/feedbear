import { v4 as uuidv4 } from "uuid";
import gc from "../config/index.js";
const bucket = gc.bucket("feedbear");

/**
 * @description Deletes the specified resource from our Google Cloud bucket.
 * @param {string}  url URL of the resource being deleted
 * @throws Will throw an error if the delete operation fails.
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
 *   uploads it to our image bucket on Google Cloud. If existingURL is
 *   provided, the resource at existingURL is overwritten.
 * @param {object} file object that will be uploaded
 * @param {string} [existingURL=null] URL of resource being replaced
 * @returns {Promise<string>} Promise object represents the URL of the uploaded
 *   file.
 * @throws Will throw an error if the write operation fails.
 */
export const uploadImage = async (file, existingURL = null) => {
  return new Promise((resolve, reject) => {
    const filename = existingURL ? existingURL.slice(-36) : uuidv4();
    const { buffer, mimetype } = file;

    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: mimetype,
      },
      resumable: false,
    });

    // write buffer to target URL in Google Cloud Storage bucket
    blobStream
      .on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        console.log(`Successfully uploaded file to ${publicUrl}`);
        resolve(publicUrl);
      })
      .on("error", (err) => {
        console.log(err);
        reject(new Error("Image upload failed"));
      })
      .end(buffer);
  });
};
