import React from 'react';
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

export default function ContactForm() {

  const user = useSelector((state) => state.user);
  const { _id, name } = user.data;

  const onSubmit = () => {
    Swal.fire({
      title: 'Message Sent!',
      text: 'Sent Successfully',
      icon: 'success'
    }).then(() => reset())
  }

  return (
    <form className='form text-center' onSubmit={onSubmit}>
      {!_id ?
        <>
          <input name='contactName' type='text' placeholder='Name' />
          <input name='contactEmail' type='email' placeholder='Email' />
        </>
        :
        <input name='contactName' type='text' value={name} className='text-gray-400' disabled />
      }
      <button className='btn-submit' type='submit'>Send</button>
    </form>
  )
}
