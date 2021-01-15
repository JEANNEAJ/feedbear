import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { convertToRaw } from 'draft-js';
import { draftToMarkdown } from 'markdown-draft-js';

import { submit, update } from "../../slices/projectSlice";
import { selectUser } from "../../slices/userSlice";
import ImageUpload from "./ImageUpload";
import { validateUrl, formatToUrl } from "../../helpers/validation";
import TextEditor from '../textEditor/TextEditor';

export default function ProjectForm({ buttonText, values, projectId }) {
  const {
    register,
    handleSubmit,
    errors,
    formState,
    reset,
    getValues,
  } = useForm();

  const { isSubmitting, isSubmitSuccessful } = formState;
  const user = useSelector(selectUser);
  const { _id: userId, name } = user;

  /* NOTE: it's difficult to incorporate image uploads/previews with RHF,
    so we're handling the file field and the text fields separately;
    text fields: use RHF methods (getValues, setValue, reset)
    file: get with variable 'file' and set with 'setFile' */
  const [file, setFile] = useState(null);

  /** The current markup in the text editor */
  const [editorValue, setEditorValue] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  // if values are provided, populate the form fields accordingly
  useEffect(() => {
    if (values) {
      reset(values);
      setFile(values.file);
    }
  }, [values, reset]);

  // when form submission succeeds, clear the form input
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setFile(null);
    }
  }, [isSubmitSuccessful, reset]);

  /** The markdown string from the editor */
  const editorMarkdown = () => {
    const rawState = convertToRaw(editorValue);
    return draftToMarkdown(rawState);
  };

  // submit the form data
  const onSubmit = async () => {
    // create and populate FormData object
    const formData = new FormData();
    const formInput = {
      userId,
      name,
      file,
      message: editorMarkdown(),
      ...getValues(), // values from the text fields
    };

    formInput.projectLink = formatToUrl(formInput.projectLink);
    formInput.liveLink = formatToUrl(formInput.liveLink);

    const keys = Object.keys(formInput);
    keys.forEach((key) => {
      // null fields will be skipped; this prevents the {file: "null"} issue
      if (formInput[key]) formData.append(key, formInput[key]);
    });

    // handle form submission for project creation/updates
    if (values) {
      await dispatch(update(projectId, formData));
      history.push(`/user/${userId}`);
    } else {
      await dispatch(submit(formData));
    }
  };

  /** update editorMarkup in state when editor state changes */
  const handleEditorChange = (value) => {
    // console.log(value);
    setEditorValue(value);
  };

  return (
    <form
      className="form flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className="sr-only" htmlFor="projectTitle">
        Project Name
      </label>
      <input
        type="text"
        name="projectTitle"
        placeholder="Project Name"
        ref={register({ required: true })}
      />
      {errors["projectTitle"] && <span className="error">This field is required</span>}

      <label className="sr-only" htmlFor="projectLink">
        Project Link
      </label>
      <input
        type="text"
        name="projectLink"
        placeholder="Enter Project Link (eg. github)"
        ref={register({ required: true, validate: { validUrl: validateUrl } })}
      />
      {errors["projectLink"] && (
        <span className="error">This field is required and must be a valid URL</span>
      )}

      <label className="sr-only" htmlFor="liveLink">
        Project Live Link
      </label>
      <input
        type="text"
        name="liveLink"
        placeholder="Enter live link"
        ref={register({ required: true, validate: { validUrl: validateUrl } })}
      />
      {errors["liveLink"] && (
        <span className="error">This field is required and must be a valid URL</span>
      )}

      {/* <label className="sr-only" htmlFor="message">
        Message
      </label>
      <textarea
        name="message"
        placeholder="Enter Message"
        ref={register({ required: true })}
      ></textarea>
      {errors["input-message"] && <span>This field is required</span>} */}

      <TextEditor onChange={handleEditorChange} />

      <ImageUpload file={file} handleUpload={setFile} />

      {/* Conditionally display info about submission status */}
      {isSubmitting && <p>Submitting...</p>}
      {isSubmitSuccessful && <p>Submission complete!</p>}

      <button className="btn-submit" onClick={handleSubmit} type="submit">
        {buttonText}
      </button>
    </form>
  );
}
