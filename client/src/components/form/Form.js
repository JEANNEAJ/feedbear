import React from 'react';

import LoginForm from '../../features/user/LoginForm';
import SignupForm from '../../features/user/SignupForm';
import FeedbackRequestForm from '../../features/feedbackRequest/FeedbackRequestForm';
import CommentForm from '../../features/feedbackDetails/CommentForm';
import CommentEditForm from '../../features/feedbackDetails/CommentEditForm';

import styles from './Form.module.css';

const Components = { LoginForm, SignupForm, FeedbackRequestForm, CommentForm, CommentEditForm };

/** Generic Form wrapper - pass form type as prop */
export default function Form(props) {
  const { type } = props;
  const FormType = Components[type];

  return (
    <div className={styles.form} action="#">
      <FormType {...props} />
    </div>
  )
}
