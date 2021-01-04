import React from 'react'

/** The time difference between now and the provided date string
 * @param {string} dateString - The date string to find the difference from
 * @returns The time difference formatted in days or hours eg. '8 days', '1 hour'.
 */
export default function timeDifference({ dateString }) {
  
  const currentDate = new Date();
  const date = new Date(Date.parse(dateString));
  const diffTime = currentDate - date;
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const display = () => {
    if (diffDays) {
      if (diffDays === 1) return `${diffDays} day`;
      else return `${diffDays} days`;
    } else if (diffHours) {
      if (diffHours === 1) return `${diffHours} hour`;
      else return `${diffHours} hours`;
    } else {
      return 'less than an hour';
    }
  }

  return (
    <time title={date}>
      {display()}
    </time>
  )
}
