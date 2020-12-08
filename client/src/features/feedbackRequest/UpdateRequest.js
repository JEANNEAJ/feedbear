import React, { useEffect, useState } from 'react'
import FeedbackRequestForm from './FeedbackRequestForm';
export const UpdateRequest = () => {

  return (
    <div>
      <h3>Edit Your Requests:</h3>
      {request ? <FeedbackRequestForm /> : <p>Loading ...</p>}
    </div>
  )
}