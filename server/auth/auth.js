import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { Strategy as JWTstrategy, ExtractJwt as ExtractJWT } from 'passport-jwt';


import UserModel from '../models/users.js';



dotenv.config();

// saves the information provided by the user to the database, and then sends the user information to the next middleware if successful
passport.use(
  'signup',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await UserModel.create({ email, password });

        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
)

// finds the first user associated with the email provided
passport.use(
  'login',
  new localStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        // check that user exists with given email
        const user = await UserModel.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        // validate user's password
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, { message: 'Wrong Password' });
        }

        // successful login
        return done(null, user, { message: 'Logged in successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
)

// verifies token generated in signup.js from the /login route
passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
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