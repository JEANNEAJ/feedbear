import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';

import UserModel from './models/users.js';


// mongoose.connect(process.env.CONNECTION_URL);
// mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

dotenv.config();
import './auth/auth.js';

import formRoutes from './routes/forms.js';
import signUpRoutes from './routes/signup.js';
import secureRoutes from './routes/secure-routes.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
// app.use(cookieParser());
// app.use(csurf({
// 	cookie: {
// 		key: '_csrf-feedbear',
// 		path: '/context-route',
// 		httpOnly: true,
// 		secure: process.env.NODE_ENV === 'production',
// 		maxAge: 3600
// 	}
// }));

app.use('/forms', formRoutes);
app.use(signUpRoutes);
app.use(secureRoutes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoutes);

// Handle errors.
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json({ error: err });
});

// app.listen(3000, () => {
// 	console.log('Server started.')
// });


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
	.catch((err) => console.log(err));


mongoose.set('useFindAndModify', false);
mongoose.set("useCreateIndex", true);