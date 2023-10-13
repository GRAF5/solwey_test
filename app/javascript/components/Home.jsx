import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div>
    <div>
      <div>
        <h1>Food Recipes</h1>
        <p>
          A curated list of recipes for the best homemade meal and delicacies.
        </p>
        <hr/>
        <Link
          to="/users"
          role="button"
        >
          Users
        </Link>
      </div>
    </div>
  </div>
);