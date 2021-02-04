import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { validateEmail } from "../../helpers/validation";
import Swal from "sweetalert2";
import Axios from "axios";

export default function ContactForm() {
  const user = useSelector((state) => state.user);
  const { _id, name, email } = user.data;

  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    if (_id) data.email = email;
    Axios({
      url: process.env.REACT_APP_EMAIL_URL,
      method: "POST",
      data,
    }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Message Sent!",
          text: "Sent Successfully",
          icon: "success",
        }).then(() => reset());
      } else {
        Swal.fire({
          title: "Something went wrong",
          text: "Please try again later",
          icon: "error",
        });
      }
    });
  };

  return (
    <form
      className="form text-center"
      noValidate={true}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-3xl font-bold">Contact Us</h2>
      <p className="mt-3 mb-5">
        Have some comments about our app? Mention it on our very own{" "}
        <Link to={"/project/5ff63422551e1e10ac0a44a1"}>project page!</Link>
      </p>
      {!_id ? (
        <>
          <input
            type="text"
            name="contactName"
            placeholder="Name"
            ref={register({ required: true })}
          />
          {errors.contactName && (
            <span className="error">Name cannot be empty</span>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            ref={register({
              required: true,
              validate: (value) => validateEmail(value),
            })}
          />
          {errors.email?.type === "required" && (
            <span className="error">E-mail cannot be empty</span>
          )}
          {errors.email?.type === "validate" && (
            <span className="error">Please enter a valid e-mail</span>
          )}
        </>
      ) : (
        <>
          <input
            type="text"
            name="contactName"
            value={name}
            style={{ display: "none" }}
            ref={register}
          />
          {/* display input only */}
          <input type="text" value={name} className="text-gray-400" disabled />
        </>
      )}
      <textarea
        name="message"
        placeholder="Enter Message Here!"
        ref={register({ required: true })}
      ></textarea>
      {errors.message && <span className="error">Message cannot be empty</span>}

      <button className="btn-submit" type="submit">
        Send
      </button>
    </form>
  );
}
