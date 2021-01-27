import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LogoutButton from "../buttons/LogoutButton";

export default function Nav() {
  const user = useSelector((state) => state.user);
  const { _id } = user.data;

  return (
    <nav className="container mx-auto p-5">
      <h1 className="text-3xl font-bold">
        <Link to={"/"}>FeedBear</Link>
      </h1>

      {_id && (
        <ul>
          <li>
            <Link to={`/user/${_id}`}>My Projects</Link>
          </li>
          <li>
            <Link to={"/"}>Back to Main Page</Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      )}
    </nav>
  );
}
