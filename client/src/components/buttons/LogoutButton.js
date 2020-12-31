import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as sessionApi from "../../api/session";
import { logout } from "../../slices/userSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      const res = await sessionApi.logout();
      if (res.status === 204) {
        dispatch(logout());
        history.push("/");
      }
    } catch (err) {
      alert(
        "Logout failed. Please delete your cookies to manually terminate your session."
      );
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
