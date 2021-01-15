import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { convertToRaw } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';

import { getComments } from "../../slices/commentSlice";
import TextEditor from '../textEditor/TextEditor';

import * as commentApi from "../../api/comments";

export default function CommentForm(props) {
  const { projectId } = props;
  const { register, handleSubmit, watch, errors, reset } = useForm();

  /** The current markup in the text editor */
  const [editorValue, setEditorValue] = useState('');

  const dispatch = useDispatch();

  /** The markdown string from the editor */
  const editorMarkdown = () => {
    const rawState = convertToRaw(editorValue);
    return draftToMarkdown(rawState);
  };

  const onSubmit = async () => {
    const comment = editorMarkdown();

    try {
      const { data } = await commentApi.createComment(projectId, { comment });
      console.log(data);

      reset(); // clear text fields & errors

      dispatch(getComments(projectId)); // update list
    } catch (err) {
      console.error(err);
    }
  };

  /** update editorMarkup in state when editor state changes */
  const handleEditorChange = (value) => {
    setEditorValue(value);
  };

  return (
    <form
      className="form flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <label className="sr-only" htmlFor="input-feedback">
        Your feedback
      </label>
      <textarea
        name="input-feedback"
        id="input-feedback"
        placeholder="Leave your feedback"
        ref={register({ required: true })}
      ></textarea>
      {errors["input-feedback"] && <span>This field is required</span>} */}

      <TextEditor onChange={handleEditorChange} />

      <button className="btn-submit" type="submit">
        Submit
      </button>
    </form>
  );
}
