import React, { Component } from "react";

import LoginForm from "../../features/user/LoginForm";
import SignupForm from "../../features/user/SignupForm";
import FeedbackRequestForm from "../../features/feedbackRequest/FeedbackRequestForm";
import CommentForm from "../../features/feedbackDetails/CommentForm";

const Components = { LoginForm, SignupForm, FeedbackRequestForm, CommentForm };

/** Generic Form wrapper - pass form type as prop */
export default function Form(props) {
  const { type } = props;
  const FormType = Components[type];

  // console.log(...props);
  return (
    <div className="container mx-auto max-w-screen-sm bg-white p-5 rounded-lg shadow-md">
      <form
        className="md:container mx:auto flex flex-col items-center"
        action="#"
      >
        <FormType {...props} />
      </form>
    </div>
  );
}
