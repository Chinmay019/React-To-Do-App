import React from "react";
import { Link } from "react-router-dom";
import {
  FaQuestionCircle,
  FaQuestion,
  FaChevronCircleUp,
} from "react-icons/fa";

function ScrollButton() {
  return (
    <div className="about-icon">
      <Link
        to={{
          pathname: "/about",
        }}
      >
        <FaChevronCircleUp size={25} />
      </Link>
    </div>
  );
}

export default ScrollButton;
