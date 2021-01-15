import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { convertToRaw } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';

import { setEditing, getComments } from "../../slices/commentSlice";
import TextEditor from '../textEditor/TextEditor';

import * as commentApi from "../../api/comments";

export default function CommentEditForm(props) {
  const { comment, projectId, commentId } = props;
  const { register, handleSubmit, watch, errors } = useForm();

  /** The current markup in the text editor */
  const [editorValue, setEditorValue] = useState('');

  const dispatch = useDispatch();

  /** The markdown string from the editor */
  const editorMarkdown = () => {
    const rawState = convertToRaw(editorValue);
    return draftToMarkdown(rawState);
  };

  const handleSave = async () => {
    try {
      // if comment has been edited then update
      if (editorMarkdown() !== comment) {
        await commentApi.updateComment(projectId, commentId, editorMarkdown());
        dispatch(getComments(projectId));
      }

      dispatch(setEditing(null));
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    dispatch(setEditing(null));
  };

  /** update editorMarkup in state when editor state changes */
  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  return (
    <form className="form" onSubmit={handleSubmit(handleSave)}>

      {/* <label className="sr-only" htmlFor="editComment"></label>
      <textarea
        name="editComment"
        id="editComment"
        defaultValue={comment}
        ref={register({ required: true })}
      ></textarea> */}
      <TextEditor defaultValue={comment} onChange={handleEditorChange} />

      <button className="btn-options" type="submit">
        save
      </button>
      <button className="btn-options" onClick={handleCancel} type="button">
        cancel
      </button>
    </form>
  );
}
