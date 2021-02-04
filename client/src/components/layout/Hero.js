import React from "react";
import LoginForm from "../forms/LoginForm";
import feedbear from "../../assets/feedbear.png";
export default function Hero() {
  return (
    <div>
      <div className=" hero-container flex flex-col md:flex-row justify-center items-center container mx-auto px-10 py-10">
        <div className="logo w-1/4">
          <img
            src={feedbear}
            alt="FeedBear logo: the adorable face of a brown, cartoon bear."
          />
        </div>

        <div className="hero-text md:w-2/5 md:pl-5">
          <h1 className="text-3xl font-bold pb-3">Welcome to FeedBear!</h1>

          <p className="text-justify">
            Remember way back when we were suppose to ask people for some
            feedback on our apps? We made an app for that! Our app allows users
            to login and post their projects and ask other users to leave
            comments.
          </p>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
