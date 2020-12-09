import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Nav() {
  const user = useSelector((state) => state.user);
  const { _id } = user.data;

  return (
    <nav className="container max-w-screen-2xl mx-auto p-5">
      <h1 className="text-3xl font-bold">
        <Link to={"/"}>Feedback App</Link>
      </h1>

      {user.isLoggedIn && (
        <ul>
          <li>
            <Link to={`/user/${_id}`}>My Feedback Requests</Link>
          </li>
          <li>
            <Link to={"/"}>Back to Main Page</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
