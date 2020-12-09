import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { submit, update } from "./feedbackRequestSlice";
import { selectUser } from "../user/userSlice";

import styles from "./FeedbackRequestForm.module.css";

export default function FeedbackRequestForm({
  buttonText,
  inputText,
  requestId,
}) {
  const user = useSelector(selectUser);
  const { _id: userId, name } = user;
  const [message, setMessage] = useState("Tear me to shreds!");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [liveLink, setLiveLink] = useState("");

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
  const handleSubmit = (e) => {
    e.preventDefault();
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
        })
      );
    }
  };

  return (
    <>
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
      />

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
      />

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
      />

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
      ></textarea>

      <button className="btn-submit" onClick={handleSubmit} type="submit">
        {buttonText}
      </button>
    </>
    // </>
  );
}
