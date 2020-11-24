import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as api from './api';
import { Counter } from './features/counter/Counter';
import './App.css';

import Form from './features/form/Form';
import FeedbackRequests from './features/feedbackRequests/FeedbackRequests';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		
	}, [])
  return (
    <div className="App">
			<header>
				<div className="wrapper">
					<h1>hello</h1>
				</div>
			</header>
      
			<main>
				<div className="wrapper">
					<Form />
					<FeedbackRequests />
				</div>
			</main>
				
				
			<footer>
				<div className="wrapper">

				</div>
			</footer>
    </div>
  );
}

export default App;
