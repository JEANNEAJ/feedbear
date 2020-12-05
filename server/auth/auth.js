import dotenv from "dotenv";
import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import {
  Strategy as JWTstrategy,
  ExtractJwt as ExtractJWT,
} from "passport-jwt";

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

        // create new User document and save it in the database
        const user = await UserModel.create({
          name,
          email,
          password,
        });

        return done(null, user);
      } catch (err) {
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
