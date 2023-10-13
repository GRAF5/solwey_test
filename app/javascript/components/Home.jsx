import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div>
    <div>
      <div>
        <h1>Solwey Test Project</h1>
        <hr/>
        <Link
          to="/users"
          role="button"
        >
          Users
        </Link>
        <Link
          to="/items"
          role="button"
        >
          Items
        </Link>
        <Link
          to="/orders"
          role="button"
        >
          Orders
        </Link>
      </div>
    </div>
  </div>
);