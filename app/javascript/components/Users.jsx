import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const url = "/api/users/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.")
      })
      .then((res) => setUsers(res))
      // .catch(() => navigate("/"));
  }, []);

  function register() {
    const body = new FormData();
    body.append("user[email]", 'user.17@admin.com');
    body.append("user[password]", 'testtest');
    body.append("user[lastName]", 'last');
    body.append("user[firstName]", 'first');
    fetch("/api/signup", {
      method: "POST",
      body
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  function update() {
    const body = new FormData();
    body.append("user[id]", '2');
    body.append("user[firstName]", 'Test');
    body.append("user[lastName]", 'Test');
    body.append("user[role]", 'admin');
    fetch("/api/users/update", {
      method: "PUT",
      body
    })
  }

  const allUsers = users.map((user, index) => (
    <div key={index}>
      <h5>{user.firstName} {user.lastName}</h5>
      <p>{user.email}</p>
      <p>{user.role}</p>
    </div>
  ));

  return (
    <>
      <Link to="/">Home</Link>
      <h1>All Users</h1>
      {
        allUsers
      }
      <button onClick={register}>Register</button>
      <button onClick={update}>Update</button>
    </>
  )
};

export default Users;