import React, { useEffect, useState } from "react";

const Items = () => {
  const [items, setItems] = useState([]);
  const [changeble, setChangeble] = useState({});
  const [addeble, setAddeble] = useState({
    name: "",
    description: "",
    price: 0
  });
  const [add, setAdd] = useState(false);

  useEffect(() => {
    getItems();
  }, []);

  function getItems() {
    const url = '/api/items/index';
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
      .then(() => setItems(items.filter(item => item.id !== id)));
  }

  function updateItem() {
    const body = new FormData();
    body.append("id", changeble.id);
    body.append("item[name]", changeble.name || '');
    body.append("item[description]", changeble.description || '');
    body.append("item[price]", changeble.price);
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
      }
    })
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
    const body = new FormData();
    body.append("name", addeble.name || "");
    body.append("description", addeble.description || "");
    body.append("price", addeble.price);
    fetch("/api/items/create", {
      method: "POST",
      body
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.")
      })
      .then(res => {
        const newItems = [...items];
        newItems.unshift(res);
        setItems(newItems);
        setAdd(false);
      });
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              add && <tr>
                <td><input id="name" onChange={changeAddeble} value={addeble.name} /></td>
                <td>
                  <textarea id="description" onChange={changeAddeble} value={addeble.description} /></td>
                <td><input id="price" onChange={changeAddeble} value={addeble.price} type="number" /></td>
                <td style={{display: "flex", justifyContent: "end"}}>
                  <button className="min" onClick={createItem}>Create</button>
                  &nbsp;
                  <button onClick={() => setAdd(false)} className="danger min">X</button>
                </td>
              </tr>
            }
            {
              items.map(item => (
                  item.id === changeble.id ?
                  <tr key={item.id}>
                    <td><input id="name" onChange={change} value={changeble.name} /></td>
                    <td><textarea id="description" onChange={change} value={changeble.description} /></td>
                    <td><input id="price" onChange={change} value={changeble.price} type="number" /></td>
                    <td style={{display: "flex", justifyContent: "end"}}>
                      <button className="min" onClick={updateItem}>Update</button>
                      &nbsp;
                      <button onClick={() => setChangeble({})} className="danger min">X</button>
                    </td>
                  </tr> : 
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td className="description">{item.description}</td>
                    <td>{item.price.toFixed(2)}&#8372;</td>
                    <td style={{display: "flex", justifyContent: "end"}}>
                      <button className="min" onClick={() => setChangeble(item)}>Change</button>
                      &nbsp;
                      <button onClick={() => remove(item.id)} className="danger min">X</button>
                    </td>
                  </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Items;