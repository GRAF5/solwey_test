import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const Items = () => {
  const [items, setItems] = useState([]);
  const [changeble, setChangeble] = useState({});
  const [addeble, setAddeble] = useState({
    name: "",
    description: "",
    price: 0
  });
  const [add, setAdd] = useState(false);
  const [changebleError, setChangebleError] = useState(null);
  const [addebleError, setAddebleError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, switchPage] = useState(1);

  useEffect(() => {
    getPages();
  }, []);
  
  useEffect(() => {
    getItems();
  }, [page]);

  function getPages() {
    fetch("/api/items/pages")
      .then(res => res.json())
      .then(res => setTotalPages(res.totalPages));
  }

  function getItems() {
    const url = `/api/items/index?page=${page}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.")
      })
      .then((res) => setItems(res));
  }

  function change(e) {
    setChangeble(state => ({...state, [e.target.id]: e.target.value}));
  }
  function changeAddeble(e) {
    setAddeble(state => ({...state, [e.target.id]: e.target.value}));
  }

  function remove(id) {
    fetch(`/api/items/destroy/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        setItems(items.filter(item => item.id !== id));
        getPages();
      });
  }

  function updateItem() {
    setChangebleError(null);
    const body = new FormData();
    body.append("id", changeble.id);
    body.append("name", changeble.name || '');
    body.append("description", changeble.description || '');
    body.append("price", changeble.price);
    fetch("/api/items/update", {
      method: "PUT",
      body
    })
    .then(async res => {
      if (res.ok) {
        const data = (await res.json()).status.data.item;
        let newItems = [...items];
        const index = newItems.findIndex(item => item.id === data.id);
        newItems[index] = data;
        setItems(newItems);
        setChangeble({});
      } else {
        throw await res.json();
      }
    })
    .catch(err => setChangebleError(err.message))
  }

  function startAdd() {
    setAddeble({
      name: "",
      description: "",
      price: 0
    });
    setAdd(true);
  }

  function createItem() {
    setAddebleError(null);
    const body = new FormData();
    body.append("name", addeble.name || "");
    body.append("description", addeble.description || "");
    body.append("price", addeble.price);
    fetch("/api/items/create", {
      method: "POST",
      body
    })
      .then(async res => {
        if (res.ok) {
          return res.json();
        }
        throw await res.json();
      })
      .then(res => {
        const newItems = [...items];
        newItems.unshift(res);
        setItems(newItems);
        setAdd(false);
        getPages();
      })
      .catch(res => setAddebleError(res.message))
  }

  return (
    <div className="container">
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h1>Items</h1>
        <button className="green min" onClick={startAdd}>
          <h1 style={{margin: 0}}>&#43;</h1>
          </button>
      </div>
      <div style={{overflowX: "auto"}}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {
              add && 
              <>
                {addebleError && <tr className="errors"><td colSpan={3}>{addebleError}</td></tr>}
                <tr>
                  <td><input id="name" onChange={changeAddeble} value={addeble.name} /></td>
                  <td>
                    <textarea id="description" onChange={changeAddeble} value={addeble.description} /></td>
                  <td><input id="price" onChange={changeAddeble} value={addeble.price} type="number" /></td>
                  <td className="control">
                    <button className="green min" onClick={createItem}>Create</button>
                    &nbsp;
                    <button onClick={() => setAdd(false)} className="danger min">&#10006;</button>
                  </td>
                </tr>
              </>
            }
            {
              items.map(item => (
                  item.id === changeble.id ?
                  <React.Fragment key={item.id}>
                  {changebleError && <tr className="errors"><td colSpan={3}>{changebleError}</td></tr>}
                  <tr>
                    <td><input id="name" onChange={change} value={changeble.name} /></td>
                    <td><textarea id="description" onChange={change} value={changeble.description} /></td>
                    <td><input id="price" onChange={change} value={changeble.price} type="number" /></td>
                    <td className="control">
                      <button className="green min" onClick={updateItem}>&#10004;</button>
                      &nbsp;
                      <button onClick={() => setChangeble({})} className="danger min">&#10006;</button>
                    </td>
                  </tr>
                  </React.Fragment> : 
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td className="description">{item.description}</td>
                    <td>{item.price.toFixed(2)}&#8372;</td>
                    <td className="control">
                      <button className="min" onClick={() => setChangeble(item)}>Change</button>
                      &nbsp;
                      <button onClick={() => remove(item.id)} className="danger min">&#10006;</button>
                    </td>
                  </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Pagination current={page} total={totalPages} switchPage={switchPage}/>
    </div>
  )
}

export default Items;