import React from "react";
import LoginForm from "../forms/LoginForm";
import feedbear from "../../assets/feedbear.png";
export default function Hero() {
  return (
    <div>
      <div className=" hero-container flex flex-col sm:flex-row justify-center items-center container mx-auto py-10">
        <div className="logo w-1/3 flex-shrink-0">
          <img
            src={feedbear}
            alt="FeedBear logo: the adorable face of a brown, cartoon bear."
          />
        </div>

        <div className="hero-text flex-grow p-5">
          <h1 className="text-xl sm:text-3xl font-bold pb-3">
            Welcome to FeedBear!
          </h1>

          <p className="text-justify">
            Remember way back when we were supposed to ask people for some
            feedback on our apps? We made an app for that! FeedBear allows users
            to login, post their projects, and ask other users to provide
            feedback.
          </p>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
