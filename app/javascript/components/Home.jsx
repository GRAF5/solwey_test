import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="container">
    <h1>Home</h1>
    <p>
      This is a test task by Andrii Bondarchuk for Solwey Consulting. The 
      task involves creating a demo online store using Ruby on Rails and React. Test users and products 
      data have been auto generated.
    </p>
    <ul>
      <li><b>Home</b> - The main page with a site map</li>
      <li><b>Catalog</b> - A page for viewing products from the Items table in the database and adding products to the shopping cart</li>
      <li><b>Orders</b> - A page for viewing all account orders from the Orders table in the database</li>
      <li><b>Administration -&gt; Users</b> - A page for viewing all accounts from the Users table. Also, for making data changes by the admin</li>
      <li><b>Administration -&gt; Items</b> - A page for making data changes to products by the admin</li>
      <li><b>Hi, &lt;username&gt;</b> - A page for editing account information</li>
      <li><b>Sign in</b> - The login page</li>
      <li><b>Sign up</b> - The registration page</li>
      <li><b>Shopping Cart Icon</b> - The Cart page for placing orders</li>
      <li><b>Logout</b> - Log out of your account</li>
    </ul>
    <p>
    These are the login credentials provided for accessing administrator privileges:
    </p>
    <p>
      Email: admin@admin.com
    </p>
    <p>
      Password: adminadmin
    </p>
    <p>You can view the full project code here: <a href="https://github.com/GRAF5/solwey_test">Github</a></p>
  </div>
);