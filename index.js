import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import "./strategies/strategies.js";

import session from "express-session";
import connectStore from "connect-mongo";

// routes
import projectRoutes from "./routes/projects.js";
import authRoutes from "./routes/auth.js";
import sessionRoutes from "./routes/session.js";
import commentRoutes from "./routes/comments.js";
import userRoutes from "./routes/user.js";

// settings
mongoose.Promise = global.Promise;
dotenv.config();
const PORT = process.env.PORT || 5000;
const MongoStore = connectStore(session);

// connect to db and start the serve
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

// middleware stack
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// required for setting 'secure: true' in session cookies on heroku
app.set("trust proxy", 1);
app.use(
  session({
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    saveUninitialized: true,
    resave: false,
    rolling: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: "session",
      ttl: parseInt(process.env.SESS_LIFETIME) / 1000,
    }),
    cookie: {
      sameSite: true,
      secure: process.env.NODE_ENV === "production", // when set to true the cookie will only work on HTTPS
      maxAge: parseInt(process.env.SESS_LIFETIME),
    },
  })
);

// serve react app statically
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/projects", projectRoutes);
app.use(authRoutes);
app.use(sessionRoutes);
app.use(commentRoutes);
app.use(userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// error-handling middleware
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message || "An unidentified error occurred." });
});
