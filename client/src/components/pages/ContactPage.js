import React from 'react';
import { Link } from "react-router-dom";
import ContactForm from './../forms/ContactForm';

export default function ContactPage() {

  const dustySticks = [
    {
      name: 'Evan Wallace',
      githubUser: 'epwallace'
    },
    {
      name: 'Nathan Kanigsberg',
      githubUser: 'nkanigsberg'
    },
    {
      name: 'Andre Facey',
      githubUser: 'afacey'
    },
    {
      name: 'Joey Chau',
      githubUser: 'j-chau'
    },
  ]
  return (
    <>
      <h2>Contact Us</h2>
      <p>Have some comments about our app? Mention it on our very own <Link to={'/project/6004d12085b0123a7889a88a'}>feedback request!</Link></p>

      <div>
        <h3>Contributors</h3>
        <ol>
          {dustySticks.map(contributor => {
            return (
              <li>
                <a href={`https://github.com/${contributor.githubUser}`} target="_blank" rel="noopener noreferrer">{contributor.name}</a>
              </li>
            )
          })}
        </ol>
      </div>

      <ContactForm />
    </>
  )
}