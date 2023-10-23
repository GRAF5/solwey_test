import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Account = ({user, signin}) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setInputs({
        firstName: user?.firstName,
        lastName: user?.lastName,
      });
    }
  }, [user]);

  function change(e) {
    setInputs(state => ({...state, [e.target.id]: e.target.value}));
  }
  
  function submit(e) {
    e.preventDefault()
    setError(null);
    const body = new FormData();
    body.append("user[id]", user.id);
    body.append("user[firstName]", inputs.firstName || '');
    body.append("user[lastName]", inputs.lastName || '');
    fetch("/api/users/update", {
      method: "PUT",
      body
    })
      .then(async res => {
        if (res.ok) {
          signin({...user, firstName: inputs.firstName, lastName: inputs.lastName});
          navigate("/");
        } else {
          throw await res.json();
        }
      })
      .catch(err => setError(err.message))
  }

  return (
    <div className="container-widjet">
      <h1>Account</h1>
      {error && <p className="errors">{error}</p>}
      <form onSubmit={submit}> 
        <label>First name:</label>
        <input value={inputs.firstName} onChange={change} id="firstName" type="text"/>
        <label>Last name:</label>
        <input value={inputs.lastName} onChange={change} id="lastName" type="text"/>
        <button>Update</button>
      </form>
    </div>
  )
};

export default Account;