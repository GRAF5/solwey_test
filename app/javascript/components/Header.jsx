import React from "react";
import { Link, useLocation  } from "react-router-dom";
import "./Header.css";

const Header = ({user, logout}) => {
  const location = useLocation();

  const link = (path, text) => <Link 
    className={location.pathname === path ? "active" : ""} 
    to={path}>{text}</Link> 

  return (
    <header>
      <div>
        {link("/", "Home")}
        {link("/items", "Items")}
        {user && link("/orders", "Orders")}
        {user?.role === 'admin' && link("/users", "Users")}
      </div>
      <div>
        {
          user ? <>
            <Link to={`/users/${user.id}`}>Hi, {user.firstName} {user.lastName}</Link>
            <Link onClick={logout} to="/">Logout</Link>
          </> : <>
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </>
        }
      </div>
    </header>
  )
};

export default Header;