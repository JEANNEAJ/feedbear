import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import "./strategies/strategies.js";

// routes
import formRoutes from "./routes/forms.js";
import authRoutes from "./routes/auth.js";
import secureRoutes from "./routes/secure-routes.js";

// settings
mongoose.Promise = global.Promise;
dotenv.config();
const PORT = process.env.PORT || 5000;

// middleware stack
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/forms", formRoutes);
app.use(authRoutes);
app.use(secureRoutes);

// TODO: decide if we want to use this approach for private routes
app.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  secureRoutes
);

// error-handling middleware
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message || "An unidentified error occurred." });
});

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
