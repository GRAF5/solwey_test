import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  function submit(e) {
    e.preventDefault();
    const body = new FormData();
    body.append("user[firstName]", inputs.firstName);
    body.append("user[lastName]", inputs.lastName);
    body.append("user[email]", inputs.email);
    body.append("user[password]", inputs.password);
    fetch("/api/signup", {
      method: "POST",
      body
    })
    .then(async res => {
      if (res.ok) {
        navigate("/signin");
      } else {
        throw await res.json();
      }
    })
    .catch(err => setError(err.message));
  }

  function change(e) {
    setInputs(state => ({...state, [e.target.id]: e.target.value}));
  }

  function valid() {
    return !!(inputs.firstName && inputs.lastName && inputs.email && inputs.password)
  }

  return (
    <div className="container-widjet">
      <h1>Sign up</h1>
      {error && <p className="errors">{error}</p>}
      <form onSubmit={submit}> 
        <label>First name:</label>
        <input onChange={change} id="firstName" type="text"/>
        <label>Last name:</label>
        <input onChange={change} id="lastName" type="text"/>
        <label>Email:</label>
        <input onChange={change} id="email" type="email"/>
        <label>Password:</label>
        <input onChange={change} id="password" type="password" />
        <button disabled={!valid()}>Sign up</button>
      </form>
    </div>
  )
};

export default Signup;