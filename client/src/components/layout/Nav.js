import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LogoutButton from "../buttons/LogoutButton";

export default function Nav() {
  const user = useSelector((state) => state.user);
  const { _id } = user.data;

  return (
    <div className="bg-gray-300 shadow">

    
      <nav className="container mx-auto p-3 flex justify-between items-center">
        <div className="logo w-10 flex items-center">
          {/* logo image */}
          <img src="Feedbear-no-tie-06.png"/>
          <h1 className="text-3xl font-bold pl-1">
            <Link to={"/"}>FeedBear</Link>
          </h1>
        </div>

        <div className="nav-options">
          {_id && (
            <ul className="flex"> 
              <li className="pr-5">
                <Link to={`/user/${_id}`}>My Projects</Link>
              </li>
              <li className="pr-5">
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
            )}
        </div>
        </nav>
    </div>
  );
}
