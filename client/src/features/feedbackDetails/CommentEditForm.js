import React from 'react';

export default function CommentEditForm(props) {
const { comment } = props;

  return (
    <form>
      <label className="sr-only" htmlFor="editComment"></label>
      <textarea name="editComment" id="editComment">{comment}</textarea>
      <button>save</button>
      <button>cancel</button>

    </form>
  )
}
