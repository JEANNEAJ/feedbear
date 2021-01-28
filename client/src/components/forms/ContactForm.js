import React from 'react';
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { validateEmail } from "../../helpers/validation";
import Swal from 'sweetalert2';
import Axios from 'axios';

export default function ContactForm() {

  const user = useSelector((state) => state.user);
  const { _id, name, email } = user.data;

  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    if (_id) data.email = email;
    Axios({
      url: process.env.REACT_APP_EMAIL_URL,
      method: 'POST',
      data
    })
    Swal.fire({
      title: 'Message Sent!',
      text: 'Sent Successfully',
      icon: 'success'
    }).then(() => reset())
  }

  return (
    <form className='form text-center' noValidate={true} onSubmit={handleSubmit(onSubmit)}>
      {!_id ?
        <>
          <input type='text'
            name='contactName'
            placeholder='Name'
            ref={register({ required: true })}
          />
          {errors.contactName && <span>Name cannot be empty</span>}

          <input type='email'
            name='email'
            placeholder='Email'
            ref={register({
              required: true,
              validate: value => validateEmail(value)
            })}
          />
          {errors.email?.type === 'required' && <span>E-mail cannot be empty</span>}
          {errors.email?.type === 'validate' && <span>Please enter a valid e-mail</span>}

        </>
        :
        <input type='text'
          name='contactName'
          value={name}
          className='text-gray-400'
          ref={register}
        />
      }
      <textarea
        name='message'
        placeholder='Enter Message Here!'
        ref={register({ required: true })}
      ></textarea>
      {errors.message && <span>Message cannot be empty</span>}

      <button className='btn-submit' type='submit'>Send</button>
    </form>
  )
}
