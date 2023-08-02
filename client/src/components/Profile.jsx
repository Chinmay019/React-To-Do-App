import React, { useContext } from "react";
import { FaUserSecret } from "react-icons/fa";
import ToDoContext from "../context/ToDoContext";

function Profile() {
  const { userName } = useContext(ToDoContext);
  return (
    <div className="profile">
      {userName}
      <FaUserSecret className="profile-logo" />
    </div>
  );
}

export default Profile;
