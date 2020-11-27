import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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


function App() {
	const dispatch = useDispatch();

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
								<Route exact path="/" component={Form} />
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
