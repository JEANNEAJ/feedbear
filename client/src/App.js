import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from './api';
import { Counter } from './features/counter/Counter';

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";

import './App.css';

import Form from './features/form/Form';
import FeedbackRequests from './features/feedbackRequests/FeedbackRequests';
import FeedbackDetails from './features/feedbackDetails/FeedbackDetails';
import SignIn from './features/signIn/SignIn';
import { selectUser } from './features/signIn/userSlice';


function App() {
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	console.log('user: ', user);

	useEffect(() => {

	}, [])

	return (
		<Router>
			<div className="App">
				<header>
					<div className="wrapper">
						<h1><Link to={"/"}>
							Feedback App
								</Link></h1>
					</div>
				</header>

				<main>
					<div className="wrapper">
						<Route exact path="/">
							{user._id ? <Form /> : <SignIn />}
						</Route>
						<Route exact path="/" component={FeedbackRequests} />
						<Route exact path="/feedback/:feedbackID" component={FeedbackDetails} />
					</div>
				</main>


				<footer>
					<div className="wrapper">

					</div>
				</footer>
			</div>
		</Router>
	);
}

export default App;
