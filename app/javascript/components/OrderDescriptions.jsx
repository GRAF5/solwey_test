import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";


const OrderDescriptions = () => {
  const navigate = useNavigate();
  const [descriptions, setDescriptions] = useState([]);
  const { orderId } = useParams();

  useEffect(() => {
    getOrderDescriptions();
  }, []);

  function getOrderDescriptions() {
    const url = `/api/orders_descriptions/index?orderId=${orderId}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.")
      })
      .then((res) => setDescriptions(res));
  }

  const allDescriptions = descriptions.map((description) => (
    <div key={description.id}>
      <h5>{description.item.name}</h5>
      <p>{description.quantity}</p>
    </div>
  ));

  return (
    <>
      <Link to="/">Home</Link>
      <h1>Order {orderId}</h1>
      {
        allDescriptions
      }
    </>
  )
};

export default OrderDescriptions;