import React, { useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux';
import styles from './FeedbackRequests.module.css';

import * as api from '../../api';

import FeedbackRequest from './feedbackRequest/FeedbackRequest';

export default function FeedbackRequests() {
	const [requests, setRequests] = useState([]);
	// const dispatch = useDispatch();

	useEffect(() => {
		handleRefresh();
	}, [])


	const handleRefresh = async () => {
		try {
			const { data } = await api.fetchForms();

			setRequests(data);
		} catch (error) {
			console.log(error);
		}
	}


	return (
		<div className={styles.container}>
			<h2>Feedback Requests</h2>
			<button className={styles.refresh} onClick={handleRefresh}>refresh 🔃</button>
			<div className="requests">
				<ul>
					{requests.map( request => <FeedbackRequest key={request._id} request={request}/> )}
				</ul>
			</div>
		</div>
	) 
}
