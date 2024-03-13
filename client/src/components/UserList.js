import React from "react";

const UserList = ({ users }) => {
  return (
    <div className="user-list">
      <h2>Users</h2>
      {users.map((user, index) => (
        <div key={index}>{user}</div>
      ))}
    </div>
  );
};

export default UserList;