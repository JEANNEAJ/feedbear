import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import feedbear from "../../assets/feedbear.png";

import LogoutButton from "../buttons/LogoutButton";

export default function Nav() {
  const user = useSelector((state) => state.user);
  const { _id } = user.data;

  return (
    <nav className="max-w-screen-xl mx-auto p-3 flex sm:flex-nowrap justify-between items-center">
      <div className="logo flex items-center w-max flex-shrink-0 pr-2">
        {/* logo image */}
        <img src={feedbear} alt="FeedBear logo" className="w-5 sm:w-10" />
        <Link to={"/"}>
          <h1 className="text-xl sm:text-3xl font-bold pl-1">FeedBear</h1>
        </Link>
      </div>

      <div className="nav-options w-max">
        <ul className="flex flex-wrap justify-center text-sm sm:text-base space-x-2 sm:space-x-5">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          {_id && (
            <li>
              <Link to={`/user/${_id}`}>My Projects</Link>
            </li>
          )}
          <li>
            <Link to={"/contact"}>Contact</Link>
          </li>
          {_id && (
            <li>
              <LogoutButton />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
