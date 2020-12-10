import React from "react";
import { Link } from "react-router-dom";

import TimeDifference from '../../components/timeDifference/TimeDifference';

import styles from "./FeedbackListItem.module.css";

export default function FeedbackListItem(props) {
  const {
    name,
    email,
    projectTitle,
    projectLink,
    liveLink,
    message,
    createdAt,
    _id,
  } = props.request;



  return (
    <li className={styles.container}>
      <div className={styles.projectTitle}>
        <h3><Link to={`/feedback/${_id}`}>{projectTitle}</Link></h3>
        {props.children}
      </div>
      <p>submitted <TimeDifference dateString={createdAt} /> ago</p>
      <p>by {name}</p>
      <a href={projectLink}>Project Link</a>
      <a href={liveLink}>Live Link</a>
      <p>{message}</p>
    </li>
  );
}
