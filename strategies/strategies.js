import dotenv from "dotenv";
import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import {
  Strategy as JWTstrategy,
  ExtractJwt as ExtractJWT,
} from "passport-jwt";
import { uploadImage } from "../helpers/helpers.js";

import UserModel from "../models/users.js";

dotenv.config();

// create strategy for registering users
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const name = req.body.name;

        // TODO: choose default avatar
        let avatar = req.file
          ? await uploadImage(req.file)
          : "https://placekitten.com/300/300";

        // create new User document and save it in the database
        const user = await UserModel.create({
          name,
          email,
          password,
          avatar,
        });

        return done(null, user);
      } catch (err) {
        // handles failed registration due to invalid email format
        if (err.errors.email) {
          err.message = err.errors.email.properties.message;
        }

        // handles failed registration due to incorrect password format (min. char, pattern)
        if (err.errors.password) {
          err.message = err.errors.password.properties.message;
        }

        // handle failed registration due to duplicate email
        if (err.code === 11000) {
          err.status = 409;
          err.message = "A user with this email already exists.";
        }

        return done(err);
      }
    }
  )
);

// create strategy for logging in
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // check that the provided email is a registered account
        const user = await UserModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        // validate user's password
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        // successful login
        return done(null, user, { message: "Logged in successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// verifies token generated in signup.js from the /login route
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
