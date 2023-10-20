import React, { useEffect, useState } from "react";

const Account = ({user}) => {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: ''
  });

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
  
  function submit() {
    const body = new FormData();
    body.append("user[id]", user.id);
    body.append("user[firstName]", inputs.firstName || '');
    body.append("user[lastName]", inputs.lastName || '');
    fetch("/api/users/update", {
      method: "PUT",
      body
    });
  }

  return (
    <div className="container-widjet">
      <h1>Account</h1>
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