import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

import * as userApi from "../../api/user";

import { selectUser } from "../../slices/userSlice";

import InfiniteScrollList from '../lists/InfiniteScrollList';

import { setSearchParams } from "../../slices/listSlice";

function UserPage() {
  const { userId: profileId } = useParams();
  const loggedInUser = useSelector(selectUser);
  const [name, setName] = useState("");

  const location = useLocation();

  const dispatch = useDispatch();

  // determine the display name for the current UserPage
  useEffect(() => {
    if (location.name && profileId !== loggedInUser._id) {
      // if name was provided in the Link component, set name from location
      setName(location.name);
    } else if (profileId === loggedInUser._id) {
      // if user is on their own profile, set name using Redux
      setName(loggedInUser.name);
    } else {
      // if all else fails, get the name from the API
      const fetchName = async (profileId) => {
        const { data } = await userApi.getUserName(profileId);
        setName(data[0].name);
      };
      fetchName(profileId);
    }

    dispatch(setSearchParams({
      idType: 'userId',
      id: profileId,
    }));

    // cleanup
    return function cleanup() {
      dispatch(setSearchParams({
        idType: '',
        id: '',
      }));
    }
  }, [location.name, loggedInUser, profileId]);

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-bold">{name}</h2>
      {/* <List type="userProjects" /> */}
    </div>
  );
}

export default UserPage;
