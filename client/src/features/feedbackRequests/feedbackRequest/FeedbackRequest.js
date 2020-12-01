import React from 'react';
import { Link } from 'react-router-dom';

import styles from './FeedbackRequest.module.css';

export default function FeedbackRequest(props) {
	const { name, email, projectTitle, projectLink, liveLink, message, createdAt, _id } = props.request;

	return (
		<li className={styles.container}>
			<h3><Link to={`/feedback/${_id}`}>
				{projectTitle}
			</Link></h3>
			<p>by {name} at {createdAt}</p>
			<a href={projectLink}>Project Link</a>
			<a href={liveLink}>Live Link</a>
			<p>{message}</p>

		</li>
	)
}
