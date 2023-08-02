import React from "react";
import loader from "../assets/loading-buffering.gif";

function Loader() {
  return <img src={loader} alt="Loading..." className="loader-class" />;
}

export default Loader;
