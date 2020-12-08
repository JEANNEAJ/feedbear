import React, { Component } from 'react';

import LoginForm from '../../features/user/LoginForm';
import SignupForm from '../../features/user/SignupForm';
import FeedbackRequestForm from '../../features/feedbackRequest/FeedbackRequestForm';
import CommentForm from '../../features/feedbackDetails/CommentForm';

import styles from './Form.module.css';

const Components = { LoginForm, SignupForm, FeedbackRequestForm, CommentForm };

/** Generic Form wrapper - pass form type as prop */
export default function Form(props) {
  const { type } = props;
  const FormType = Components[type];

  // console.log(...props);
  return (
    <form className={styles.form} action="#">
      <FormType {...props} />
    </form>
  )
}
