import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { submit, update } from "./feedbackRequestSlice";
import { selectUser } from "../user/userSlice";
import ImageUpload from "../../components/ImageUpload";

export default function FeedbackRequestForm({
  buttonText,
  inputText,
  requestId,
}) {
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

  const dispatch = useDispatch();
  const history = useHistory();

  // if values are provided, populate the form fields accordingly
  useEffect(() => {
    if (inputText) {
      reset(inputText);
      setFile(inputText.file);
    }
  }, [inputText, reset]);

  // when form submission succeeds, clear the form input
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setFile(null);
    }
  }, [isSubmitSuccessful, reset]);

  // submit the form data
  const onSubmit = async () => {
    // create and populate FormData object
    const formData = new FormData();
    const formInput = {
      userId,
      name,
      file,
      ...getValues(), // inputText from the text fields
    };
    const keys = Object.keys(formInput);
    keys.forEach((key) => {
      // null fields will be skipped; this prevents the {file: "null"} issue
      if (formInput[key]) formData.append(key, formInput[key]);
    });

    // handle form submission for FBR creation/updates
    if (inputText) {
      await dispatch(update(requestId, formData));
      history.push(`/user/${userId}`);
    } else {
      await dispatch(submit(formData));
    }
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
        className="input-text"
        type="text"
        name="projectTitle"
        placeholder="Project Name"
        ref={register({ required: true })}
      />
      {errors["projectTitle"] && <span>This field is required</span>}

      <label className="sr-only" htmlFor="projectLink">
        Project Link
      </label>
      <input
        className="input-text"
        type="text"
        name="projectLink"
        placeholder="Enter Project Link (eg. github)"
        ref={register({ required: true })}
      />
      {errors["projectLink"] && <span>This field is required</span>}

      <label className="sr-only" htmlFor="liveLink">
        Project Live Link
      </label>
      <input
        className="input-text"
        type="text"
        name="liveLink"
        placeholder="Enter live link"
        ref={register({ required: true })}
      />
      {errors["liveLink"] && <span>This field is required</span>}

      <label className="sr-only" htmlFor="message">
        Message
      </label>
      <textarea
        className="input-text"
        name="message"
        placeholder="Enter Message"
        ref={register({ required: true })}
      ></textarea>
      {errors["input-message"] && <span>This field is required</span>}

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
