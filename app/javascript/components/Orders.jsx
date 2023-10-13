import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [descriptions, setDescriptions] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  function getOrders() {
    const url = '/api/orders/index';
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.")
      })
      .then((res) => setOrders(res));
  }

  function getOrderDescriptions(id) {
    const url = `/api/orders_descriptions/index?odrerId=${id}`;
    setDescriptions([]);
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.")
      })
      .then((res) => setDescriptions(res));
  }

  const allOrders = orders.map((order) => (
    <div key={order.id}>
      <h5>{order.id}</h5>
      <p>{order.amount}</p>
      <Link to={`/orders/${order.id}`}>Details</Link>
    </div>
  ));

  return (
    <>
      <Link to="/">Home</Link>
      <h1>All Orders</h1>
      {
        allOrders
      }
    </>
  )
};

export default Orders;