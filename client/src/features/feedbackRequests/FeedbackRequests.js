import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from './FeedbackRequests.module.css';

import * as api from '../../api';

export default function FeedbackRequests() {
	const [requests, setRequests] = useState([]);
	const dispatch = useDispatch();


	const handleRefresh = async () => {
		try {
			const { data } = await api.fetchForms();

			console.log(data);
			

		} catch (error) {
			console.log(error);
		}
	}



	return (
		<div className={styles.container}>
			<h2>Feedback Requests</h2>
			<button className={styles.refresh} onClick={handleRefresh}>refresh 🔃</button>
		</div>
	) 
}
