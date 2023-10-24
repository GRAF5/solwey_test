import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Catalog.css";
import Pagination from "./Pagination";


const Catalog = ({user, cart, setCart}) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [page, switchPage] = useState(1);

  useEffect(() => {
    fetch("/api/items/pages")
      .then(res => res.json())
      .then(res => setTotalPages(res.totalPages))
  }, []);

  useEffect(() => {
    getItems();
  }, [page]);

  function getItems() {
    const filter = input;
    const url = `/api/items/index?page=${page}${filter ? "&filter='" + filter + "'" : ''}`;
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
    if (count <= 0) {
      document.getElementById(`${id}-count`).value = "";
      return;
    }
    const oldIndex = cart.findIndex(item => item.id === id);
    const newCart = [...cart];
    if (oldIndex >= 0) {
      newCart[oldIndex].count = newCart[oldIndex].count + count;
    } else {
      newCart.push({id, count});
    }
    setCart(newCart);
    navigate("/cart");
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
      {!input && <Pagination current={page} total={totalPages} switchPage={switchPage}/>}
    </div>
  )
};

export default Catalog;