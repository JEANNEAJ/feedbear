import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import * as api from '../../api';

import FeedbackRequest from '../feedbackRequests/feedbackRequest/FeedbackRequest';

export default function UserPage() {
	const user = useSelector(state => state.user);
	const { name, _id } = user.data;
	// console.log(_id);

	const [requests, setRequests] = useState([]);

	useEffect(() => {
		handleRefresh();
	}, []);

	const handleRefresh = async () => {
		try {
			const { data } = await api.fetchFormByID('userId', _id);
			console.log(data);
			setRequests(data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div>
			<p>Welcome {name}!</p>

			<h3>Your Feedback Requests:</h3>

			{
				!requests.length ? <p>Nothing here, try making a <Link to={'/'}>new Feedback Request</Link></p> :
				<ul>
					{requests.map(request => <FeedbackRequest key={request._id} request={request} />)}
				</ul>
			}

			<button onClick={handleRefresh} >refresh 🔃</button>

		</div>
	)
}
