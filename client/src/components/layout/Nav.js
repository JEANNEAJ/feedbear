import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import feedbear from "../../assets/feedbear.png";

import LogoutButton from "../buttons/LogoutButton";

export default function Nav() {
  const user = useSelector((state) => state.user);
  const { _id } = user.data;

  return (


    
      <nav className="container mx-auto p-3 flex justify-between items-center">
        <div className="logo w-10 flex items-center">
          {/* logo image */}
          <img src={feedbear} alt=""/>
          <h1 className="text-3xl font-bold pl-1">
            <Link to={"/"}>FeedBear</Link>
          </h1>
        </div>

      <div className="nav-options">
        <ul className="flex">
          <li className="pr-5"><Link to={"/"}>Home</Link></li>
          {_id && <li className="pr-5"><Link to={`/user/${_id}`}>My Projects</Link></li>}
          <li className="pr-5"><Link to={"/contact"}>Contact</Link></li>
          {_id && <li><LogoutButton /></li>}
        </ul>
      </div>

      </nav>
   
  );
}
