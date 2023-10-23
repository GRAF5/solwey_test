import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Catalog.css";


const Catalog = ({user, cart, setCart}) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    const filter = input;
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
    if (!user) {
      navigate('/signin');
      return;
    }
    const count = Math.floor(+(document.getElementById(`${id}-count`).value));
    const oldIndex = cart.findIndex(item => item.id === id);
    const newCart = [...cart];
    if (oldIndex >= 0) {
      newCart[oldIndex].count = newCart[oldIndex].count + count;
    } else {
      newCart.push({id, count});
    }
    setCart(newCart);
  }

  const allItems = items.map((item) => (
    <div className="item" key={item.id}>
      <h4>{item.name}</h4>
      <p className="description">{item.description}</p>
      <p className="price">{(Math.floor(item.price * 100) / 100).toFixed(2)}&#8372;</p>
      <div className="add">
        <div className="input">
          <label htmlFor={`${item.id}-count`}>Count:</label>
          <input id={`${item.id}-count`} type="number" />
        </div>
        <button className="min" onClick={() => addToCart(item.id)}>Add</button>
      </div>
    </div>
  ));

  return (
    <div className="container">
      <h1>Сatalog</h1>
      <div style={{display: "flex"}}>
        <input onInput={(e) => setInput(e.target.value)} min={1} type="text"/>
        <button className="min" onClick={getItems}>Find</button>
      </div>
      <div className="items">
        {
          allItems
        }
      </div>
    </div>
  )
};

export default Catalog;