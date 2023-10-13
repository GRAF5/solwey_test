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
    let csrfToken = document.querySelector("[name=csrf-token]");
    const body = new FormData();
    body.append("user[email]", 'admin@admin.com');
    body.append("user[password]", 'admin');
    // body.append("user[lastName]", 'last');
    // body.append("user[firstName]", 'first');
    fetch("/api/signup", {
      method: "POST",
      headers:{
        "x-csrf-token": csrfToken.content
      },
      body
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  function login() {
    let csrfToken = document.querySelector("[name=csrf-token]");
    const body = new FormData();
    body.append("user[email]", 'admin@admin.com');
    body.append("user[password]", 'adminadmin');
    // body.append("user[lastName]", 'last');
    // body.append("user[firstName]", 'first');
    fetch("/api/login", {
      method: "POST",
      headers:{
        "x-csrf-token": csrfToken.content
      },
      body
    })
    .then(res => res.json())
    .then(res => {
      localStorage.setItem('userId', res.status.data.user.id);
      localStorage.setItem('userRole', res.status.data.user.role);
    })
    .catch(err => console.log(err));
  }

  function logout() {
    let csrfToken = document.querySelector("[name=csrf-token]");
    fetch("/api/logout", {
      method: "DELETE",
      headers:{
        "x-csrf-token": csrfToken.content
      },
      // data: {
      //   authenticity_token: csrfToken
      // }
     })
    .then(res => {
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
    })
    .catch(err => console.log(err));
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
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </>
  )
};

export default Users;