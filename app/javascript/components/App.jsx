import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Users from "../components/Users";
import Items from "../components/Items";
import Orders from "../components/Orders";
import OrderDescriptions from "../components/OrderDescriptions";
import Header from "../components/Header";
import './App.css';
import Signin from "./Signin";
import Signup from "./Signup";

export default props => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/login", {
      method: "POST"
    })
    .then(async res => {
      if (res.ok) {
        signin((await res.json()).status.data.user);
      }
    });
  }, [])

  function signin(record) {
    setUser(record);
  }

  function logout() {
    fetch("/api/logout", {
      method: "DELETE"
     })
    .then(res => {
      setUser(null);
    });
  }

  return (
    <>
      <div id="content">
        <Router>
        <Header user={user} signin={signin} logout={logout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/items" element={<Items />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:orderId" element={<OrderDescriptions />} />
            <Route path="/signin" element={<Signin signin={signin}/>} />
            <Route path="/signup" element={<Signup/>} />
          </Routes>
        </Router>
      </div>
    </>
  )
};
