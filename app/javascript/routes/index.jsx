import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Users from "../components/Users";
import Items from "../components/Items";
import Orders from "../components/Orders";
import OrderDescriptions from "../components/OrderDescriptions";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/items" element={<Items />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:orderId" element={<OrderDescriptions />} />
    </Routes>
  </Router>
);