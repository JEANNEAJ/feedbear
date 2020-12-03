import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submit } from './formSlice';
import { selectUser } from './../signIn/userSlice';


import styles from './Form.module.css';


export default function Form() {
	const user = useSelector(selectUser);
  const { _id: userId, name, email } = user;
	const [message, setMessage] = useState('Tear me to shreds!');
	const [projectTitle, setProjectTitle] = useState('');
	const [projectLink, setProjectLink] = useState('');
	const [liveLink, setLiveLink] = useState('');
	const dispatch = useDispatch();

	// submit the form data
	const handleSubmit = e => {
		e.preventDefault();
		dispatch(submit({
			userId,
      name,
			email,
			message,
			projectTitle,
			projectLink,
			liveLink
		}));

	}


	return (
		<div>
			<h2>Get feedback on your app</h2>
			<form className={styles.feedbackRequest} action="#">

				<label className="sr-only" htmlFor="input-title">Project Name</label>
				<input className={styles.center} onChange={e => setProjectTitle(e.target.value)} type="text" name="input-title" id="input-title" placeholder="Project Name" value={projectTitle} />

				<label className="sr-only" htmlFor="input-projectLink">Project Link</label>
				<input className={styles.left} onChange={e => setProjectLink(e.target.value)} type="text" name="input-projectLink" id="input-projectLink" placeholder="Enter Project Link (eg. github)" value={projectLink} />

				<label className="sr-only" htmlFor="input-liveLink">Project Live Link</label>
				<input className={styles.right} onChange={e => setLiveLink(e.target.value)} type="text" name="input-liveLink" id="input-liveLink" placeholder="Enter live link" value={liveLink} />

				<label className="sr-only" htmlFor="input-message">Message</label>
				<textarea className={styles.message} onChange={e => setMessage(e.target.value)} name="input-message" id="input-message" placeholder="Enter Message" value={message}></textarea>

				<button className={styles.button} onClick={handleSubmit} type="submit">Submit</button>
			</form>
		</div>
	)
}
