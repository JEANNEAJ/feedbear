import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import styles from "./Nav.module.css";

export default function Nav() {
  const user = useSelector((state) => state.user);
  const { _id } = user.data;

  return (
    <nav className={styles.nav}>
      <h1>
        <Link to={"/"}>Feedback App</Link>
      </h1>

      <ul>
        {user.isLoggedIn && (
          <li>
            <Link to={`/user/${_id}`}>My Feedback Requests</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
