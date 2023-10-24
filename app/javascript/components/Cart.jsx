import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({cart, setCart}) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (cart.length) {
      const ids = cart.map(item => `ids[]=${item.id}`);
      const url = `/api/items/index?${ids.join("&")}`;
      fetch(url)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error("Network response was not ok.")
        })
        .then((res) => {
          const newItems = res.map(item => ({
            ...item, 
            count: cart.find(cartItem => cartItem.id === item.id).count}));
          setItems(newItems);
        });
    } else {
      setItems([]);
    }
  }, [cart.length]);

  function remove(id) {
    setCart(cart.filter(item => item.id !== id));
  }

  function buy() {
    const url = '/api/orders/create';
    const body = new FormData();
    body.append("order[items]", JSON.stringify(cart.map(item => {return {id: item.id, count: item.count}})));
    fetch(url, {
      method: 'POST',
      body
    }).then(() => setCart([]));
  }

  return (
    <div className="container">
      <h1>Cart</h1>
      <div style={{overflowX: "auto"}}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Count</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.count}</td>
                  <td>{(Math.floor(item.count * item.price * 100) / 100).toFixed(2)}&#8372;</td>
                  <td style={{display: "flex", justifyContent: "end"}}>
                    <button onClick={() => remove(item.id)} className="danger min">&#10006;</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      &nbsp;
      <button onClick={buy} disabled={cart.length === 0}>Buy for {items.reduce((amount, item) => amount + item.count * item.price, 0)}&#8372;</button>
    </div>
  )
};

export default Cart;