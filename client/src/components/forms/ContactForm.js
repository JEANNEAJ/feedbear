import React from 'react';
import { useSelector } from "react-redux";

export default function ContactForm() {

  const user = useSelector((state) => state.user);
  const { _id, name } = user.data;

  return (
    <form className='form text-center' onSubmit=''>
      {!_id ? (
        <>
          <input name='contactName' type='text' placeholder='Name' />
          <input name='contactEmail' type='email' placeholder='Email' />
        </>
      ) : (
          <input name='contactName' type='text' value={name} className='text-gray-400' disabled />
        )
      }
      <textarea name='contactMsg' placeholder='Enter Message Here!'></textarea>
      <button className='btn-submit'>Send</button>
    </form>
  )
}
