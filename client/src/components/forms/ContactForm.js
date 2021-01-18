import React from 'react';

export default function ContactForm() {
  return (
    <form className='form' onSubmit=''>
      <input name='contactName' type='text' placeholder='Name' />
      <input name='contactEmail' type='email' placeholder='Email' />
      <textarea name='contactMsg' placeholder='Enter Message Here!'></textarea>
    </form>
  )
}
