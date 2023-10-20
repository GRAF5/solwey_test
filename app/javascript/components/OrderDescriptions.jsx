import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const OrderDescriptions = () => {
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

  return (
    <div className="container">
      <h1>Order {orderId}</h1>
      <div style={{overflowX: "auto"}}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {
              descriptions.map(description => (
                <tr key={description.id}>
                  <td>{description.item?.name || "Item removed"}</td>
                  <td>{description.quantity}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default OrderDescriptions;