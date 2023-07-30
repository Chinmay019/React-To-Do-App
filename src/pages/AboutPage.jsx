import React from "react";
import { Link } from "react-router-dom";
import CustomCard from "../shared/CustomCard";

function AboutPage() {
  return (
    <CustomCard>
      <h1>This is a To-Do Application</h1>
      <p>Developed with ❤️ by Chinmay</p>
      <p>
        <Link
          to={{
            pathname: "/",
          }}
        >
          Back to Home
        </Link>
      </p>
    </CustomCard>
  );
}

export default AboutPage;
