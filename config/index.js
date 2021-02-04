// config for google cloud storage
import { Storage } from "@google-cloud/storage";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// construct path to GCS config
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serviceKey = path.join(__dirname, "./keys.json");

// construct storage object used in ../helpers/helper.js
const storage = new Storage({
  credentials: {
    client_email: process.env.GCS_CLIENT_EMAIL,
    private_key: process.env.GCS_PRIVATE_KEY.replace(
      new RegExp("\\\\n", "g"),
      "\n"
    ),
  },
  keyFilename: serviceKey,
});

export default storage;
