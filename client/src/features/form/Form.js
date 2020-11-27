import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, submit } from './formSlice';

import styles from './Form.module.css';


export default function Form() {
	const user = useSelector(selectUser);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('Tear me to shreds!');
	const [projectLink, setProjectLink] = useState('');
	const [liveLink, setLiveLink] = useState('');
	const dispatch = useDispatch();


	// submit the form data
	const handleSubmit = e => {
		e.preventDefault();
		dispatch(submit({
			name,
			email, 
			message,
			projectLink,
			liveLink,
		}));
		
	}


	return (
		<div>
			<h2>Get feedback on your app</h2>
			<form className={styles.feedbackRequest} action="#">

				<label className="sr-only" htmlFor="input-name">Name</label>
				<input className={styles.left} onChange={e => setName(e.target.value)} type="text" name="input-name" id="input-name" placeholder="Enter name" />

				<label className="sr-only" htmlFor="input-email">Name</label>
				<input className={styles.right} onChange={e => setEmail(e.target.value)} type="email" name="input-email" id="input-email" placeholder="Enter email" />

				<label className="sr-only" htmlFor="input-projectLink">Name</label>
				<input className={styles.left} onChange={e => setProjectLink(e.target.value)} type="text" name="input-projectLink" id="input-projectLink" placeholder="Enter Project Link (eg. github)" />

				<label className="sr-only" htmlFor="input-liveLink">Name</label>
				<input className={styles.right} onChange={e => setLiveLink(e.target.value)} type="text" name="input-liveLink" id="input-liveLink" placeholder="Enter live link" />

				<label className="sr-only" htmlFor="input-message">Name</label>
				<textarea className={styles.message} onChange={e => setMessage(e.target.value)} name="input-message" id="input-message" placeholder="Enter Message" ></textarea>

				<button className={styles.button} onClick={handleSubmit} type="submit">Submit</button>
			</form>
		</div>
	)
}
