import React, { useState, useEffect } from 'react'; 

import TimeDifference from '../../components/timeDifference/TimeDifference';

import * as userApi from '../../api/user.js';

export default function CommentListItem (props) {
  const { _id, comment, createdAt, userId } = props.comment;
  const [user, setUser] = useState({});
  
  const fetchUserData = async () => {
    try {
      const { data } = await userApi.getUserName(userId);
      setUser(data[0]);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <li className='p-3 rounded-md border flex max-w-2xl mx-auto'> 
      {!user ? (
          "Loading..."
        ) : (
          <>
          {/* <img className='w-12 h-12 rounded-full flex-none' src={user.avatarUrl} alt={user.name} /> */}
          <div className='pl-3'>
            <h4 className='font-bold'><a href='#'>{user.name}</a></h4>
            <p>submitted <TimeDifference dateString={createdAt} /> ago</p>
            <p>{comment}</p>
          </div>
          </>
        )
      }
    </li>
  )
}