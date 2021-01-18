import React from 'react';
import { Link } from "react-router-dom";
import ContactForm from './../forms/ContactForm';

export default function ContactPage() {
  return (
    <>
      <h2>Contact Us</h2>
      <p>Have some comments about our app? Mention it on our very own <Link to={'/project/6004d12085b0123a7889a88a'}>feedback request!</Link></p>

      <ContactForm />
    </>
  )
}