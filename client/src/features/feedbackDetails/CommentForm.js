import React from 'react'

export default function CommentForm() {
  return (
    <form action="#">
      <label className="sr-only" htmlFor="input-feedback">
        Your feedback
            </label>
      <textarea
        name="input-feedback"
        id="input-feedback"
        placeholder="Leave your feedback"
      ></textarea>

      <button type="submit">Submit</button>
    </form>
  )
}
