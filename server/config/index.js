// config for google cloud storage
import { Storage } from "@google-cloud/storage";
import path from "path";
import { fileURLToPath } from "url";

// construct path to GCS key
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceKey = path.join(__dirname, "./keys.json");

// construct storage object used in ../helpers/helper.js
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: "feedbear-298219",
});

export default storage;
