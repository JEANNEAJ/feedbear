import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './userSlice';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleChange = (handler, e) => {
        handler(e.target.value);
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const credentials = { email, password };
        dispatch(login(credentials));
    }

    return(
        <form>
            <input
                name='email'
                type='text'
                onChange={(e) => handleChange(setEmail, e)}
            />

            <input
                name='password'
                type='password'
                onChange={(e) => handleChange(setPassword, e)}
            />

            <button onClick={handleLogin}>Sign In</button>
        </form>
    )
}

export default SignIn;