import React from 'react';

import styles from './FeedbackRequest.module.css';

export default function FeedbackRequest(props) {
	const { name, email, projectLink, liveLink, message, createdAt } = props.request;

	return (
		<li className={styles.container}>
			<h3>Project Name</h3>
			<p>by {name} at {createdAt}</p>
			<a href={projectLink}>Project Link</a>
			<a href={liveLink}>Live Link</a>
			<p>{message}</p>
		</li>
	)
}
