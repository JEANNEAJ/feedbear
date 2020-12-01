import React from 'react';
import { useSelector } from 'react-redux';

export default function UserPage() {
	const user = useSelector(state => state.user);
	const { name } = user.data;
	console.log(name);

	return (
		<div>
			<h2>Welcome {name}!</h2>
			
		</div>
	)
}
