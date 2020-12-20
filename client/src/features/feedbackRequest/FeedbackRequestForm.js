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
  const { register, handleSubmit, watch, errors } = useForm();
  const user = useSelector(selectUser);
  const { _id: userId, name } = user;
  const [message, setMessage] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (inputText) {
      setProjectTitle(inputText.projectTitle);
      setProjectLink(inputText.projectLink);
      setLiveLink(inputText.liveLink);
      setMessage(inputText.message);
      setFile(inputText.file);
    }
  }, [inputText]);

  // submit the form data
  const onSubmit = async () => {
    // create and populate FormData object
    const formData = new FormData();
    const formInput = {
      userId,
      name,
      message,
      projectTitle,
      projectLink,
      liveLink,
      file,
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
      <label className="sr-only" htmlFor="input-title">
        Project Name
      </label>
      <input
        className="input-text"
        onChange={(e) => setProjectTitle(e.target.value)}
        type="text"
        name="input-title"
        id="input-title"
        placeholder="Project Name"
        value={projectTitle}
        ref={register({ required: true })}
      />
      {errors["input-title"] && <span>This field is required</span>}

      <label className="sr-only" htmlFor="input-projectLink">
        Project Link
      </label>
      <input
        className="input-text"
        onChange={(e) => setProjectLink(e.target.value)}
        type="text"
        name="input-projectLink"
        id="input-projectLink"
        placeholder="Enter Project Link (eg. github)"
        value={projectLink}
        ref={register({ required: true })}
      />
      {errors["input-projectLink"] && <span>This field is required</span>}

      <label className="sr-only" htmlFor="input-liveLink">
        Project Live Link
      </label>
      <input
        className="input-text"
        onChange={(e) => setLiveLink(e.target.value)}
        type="text"
        name="input-liveLink"
        id="input-liveLink"
        placeholder="Enter live link"
        value={liveLink}
        ref={register({ required: true })}
      />
      {errors["input-liveLink"] && <span>This field is required</span>}

      <label className="sr-only" htmlFor="input-message">
        Message
      </label>
      <textarea
        className="input-text"
        onChange={(e) => setMessage(e.target.value)}
        name="input-message"
        id="input-message"
        placeholder="Enter Message"
        value={message}
        ref={register({ required: true })}
      ></textarea>
      {errors["input-message"] && <span>This field is required</span>}

      <ImageUpload file={file} handleUpload={setFile} />

      <button className="btn-submit" onClick={handleSubmit} type="submit">
        {buttonText}
      </button>
    </form>
  );
}
