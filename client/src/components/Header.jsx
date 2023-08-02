import React from "react";
import Profile from "./Profile";

function Header() {
  return (
    <div className="header-flex">
      <div className="header">To-Do List</div>
      <Profile />
    </div>
  );
}

export default Header;
