import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { submit, update } from "./feedbackRequestSlice";
import { selectUser } from "../user/userSlice";

export default function FeedbackRequestForm({
  buttonText,
  inputText,
  requestId,
}) {
  const { register, handleSubmit, watch, errors } = useForm();
  const user = useSelector(selectUser);
  const { _id: userId, name } = user;
  const [message, setMessage] = useState("Tear me to shreds!");
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
    }
  }, []);

  // submit the form data
  const onSubmit = () => {
    if (inputText) {
      dispatch(
        update(
          {
            message,
            projectTitle,
            projectLink,
            liveLink,
          },
          requestId
        )
      );
      // TODO: synchronisity problem: updated requests does not always show on the user page -> instead of refreshisng page, update object in frontend
      history.push("/user/:userId");
    } else {
      dispatch(
        submit({
          userId,
          name,
          message,
          projectTitle,
          projectLink,
          liveLink,
          file,
        })
      );
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

      <div className="w-full flex flex-col items-center">
        <input
          className="opacity-0 h-1"
          type="file"
          name="file-input"
          id="file-input"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label
          className="input-text flex items-center w-full"
          htmlFor="file-input"
        >
          <p className="btn-submit m-0 bg-purple-200 shadow-inner">
            Attach an image
          </p>
          <p className="flex-grow p-2 mt-0">{file?.name}</p>
        </label>
      </div>

      <button className="btn-submit" onClick={handleSubmit} type="submit">
        {buttonText}
      </button>
    </form>
  );
}
