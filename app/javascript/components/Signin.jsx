import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = ({signin}) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  function submit(e) {
    e.preventDefault();
    const body = new FormData();
    body.append("user[email]", inputs.email);
    body.append("user[password]", inputs.password);
    fetch("/api/login", {
      method: "POST",
      body
    })
    .then(async res => {
      if (res.ok) {
        signin((await res.json()).status.data.user)
        navigate("/");
      } else {
        throw await res.json();
      }
    })
    .catch(err => setError(err.message));
  }

  function change(e) {
    setInputs(state => ({...state, [e.target.id]: e.target.value}));
  }

  return (
    <div className="container-widjet">
      <h1>Sign in</h1>
      {error && <p className="errors">{error}</p>}
      <form onSubmit={submit}> 
        <label>Email:</label>
        <input onChange={change} id="email" type="email"/>
        <label>Password:</label>
        <input onChange={change} id="password" type="password" />
        <button>Sign in</button>
      </form>
    </div>
  )
};

export default Signin;