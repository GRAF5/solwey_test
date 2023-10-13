import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Items = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    const filter = input
    const url = `/api/items/index${filter ? "?filter='" + filter + "'" : ''}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.")
      })
      .then((res) => setItems(res));
  }

  function addToCart(id) {
    const count = +document.getElementById(`${id}-count`).value;
    const oldIndex = cart.findIndex(item => item.id === id);
    const newCart = [...cart];
    if (oldIndex >= 0) {
      newCart[oldIndex].count = newCart[oldIndex].count + count;
    } else {
      newCart.push({id, count, data: items.find(item => item.id === id)});
    }
    setCart(newCart);
  }

  function buy() {
    const url = '/api/orders/create';
    const body = new FormData();
    body.append("order[items]", JSON.stringify(cart.map(item => {return {id: item.id, count: item.count}})));
    fetch(url, {
      method: 'POST',
      body
    });
  }

  const allItems = items.map((item) => (
    <div key={item.id}>
      <h5>{item.name}</h5>
      <p>{item.description}</p>
      <p>{(Math.floor(item.price * 100) / 100).toFixed(2)}</p>
      <label htmlFor={`${item.id}-count`}>Count:</label>
      <input id={`${item.id}-count`} type="text" />
      <button onClick={() => addToCart(item.id)}>Add</button>
    </div>
  ));

  const cartItems = cart.map((item) => (
    <div key={item.id}>
      <h5>{item.data.name}</h5>
      <p>{item.count}</p>
      <p>{(Math.floor((item.data.price * item.count) * 100) / 100).toFixed(2)}</p>
    </div>
  ));

  return (
    <>
      <Link to="/">Home</Link>
      <h1>All Items</h1>
      <input onInput={(e) => setInput(e.target.value)} type="text"/>
      <button onClick={getItems}>Find</button>
      {
        allItems
      }
      {
        cart.length ? <div>
          <h1>Cart</h1>
          {
            cartItems
          }
          <p>Amount: {(Math.floor(
            cart.reduce((amount, item) => amount + item.count * item.data.price, 0)
              * 100) / 100).toFixed(2)}</p>
          <button onClick={buy}>Buy</button>
        </div> : <></>
      }
    </>
  )
};

export default Items;