import React, { useRef, useState } from 'react';
import './App.css';

function UserList({users}) {

const userListContent=users.map((user)=>{
return <p className="UserName" key={user} >{user}</p>
});

  return (
    <div className="UserList">
      {userListContent}
    </div>
  );
}

export default UserList;
