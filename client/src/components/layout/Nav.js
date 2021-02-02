import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LogoutButton from "../buttons/LogoutButton";

export default function Nav() {
  const user = useSelector((state) => state.user);
  const { _id } = user.data;

  return (
    <nav className="container mx-auto p-5 flex justify-between">

      <div className="logo">
        {/* logo image */}
        <h1 className="text-3xl font-bold">
          <Link to={"/"}>FeedBear</Link>
        </h1>
      </div>

      <div className="nav-options">
        <ul className="flex">
          <li className="pr-5"><Link to={"/contact"}>Contact</Link></li>
          {_id && (
            <>
              <li className="pr-5"><Link to={`/user/${_id}`}>My Projects</Link></li>
              <li className="pr-5"><Link to={"/"}>Back to Main Page</Link></li>
              <li><LogoutButton /></li>
            </>
          )}
        </ul>
      </div>

    </nav>
  );
}
