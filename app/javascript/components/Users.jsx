import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [change, setChange] = useState({});
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [page, switchPage] = useState(1);

  useEffect(() => {
    fetch("/api/users/pages")
      .then(res => res.json())
      .then(res => setTotalPages(res.totalPages));
  }, []);

  useEffect(() => {
    getUsers();
  }, [page]);
  
  function getUsers() {
    const url = `/api/users/index?page=${page}`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.")
      })
      .then((res) => setUsers(res))
  }

  function set(e) {
    setChange(state => ({...state, [e.target.id]: e.target.value}));
  }

  function updateUser() {
    setError(null);
    const body = new FormData();
    body.append("user[id]", change.id);
    body.append("user[firstName]", change.firstName || '');
    body.append("user[lastName]", change.lastName || '');
    body.append("user[role]", change.role || '');
    fetch("/api/users/update", {
      method: "PUT",
      body
    })
    .then(async res => {
      if (res.ok) {
        const data = (await res.json()).status.data.user;
        let newUsers = [...users];
        const index = newUsers.findIndex(user => user.id === data.id);
        newUsers[index] = data;
        setUsers(newUsers);
        setChange({});
      } else {
        throw await res.json();
      }
    })
    .catch(err => setError(err.message))
  }

  return (
    <div className="container">
      <h1>All Users</h1>
      <div style={{overflowX: "auto"}}>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Control</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) => (
                change?.id === user.id ? 
                <React.Fragment key={user.id}>
                {error && <tr className="errors"><td colSpan={5}>{error}</td></tr>}
                <tr>
                  <td>{user.id}</td>
                  <td><input onChange={set} id="firstName" value={change.firstName} /></td>
                  <td><input onChange={set} id="lastName" value={change.lastName} /></td>
                  <td><input onChange={set} id="email" value={change.email} /></td>
                  <td><select onChange={set} id="role" value={change.role}>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select></td>
                  <td className="control">
                    <button onClick={updateUser}>Save</button>
                    &nbsp;
                    <button className="danger" onClick={() => setChange({})}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg"  
                        viewBox="0 0 50 50" 
                        width="15px" 
                        height="15px">
                        <path fill='currentColor' d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"/>
                      </svg>
                    </button>
                  </td>
                </tr>
                </React.Fragment> :
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td><button onClick={() => setChange(user)}>Change</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Pagination current={page} total={totalPages} switchPage={switchPage}/>
    </div>
  )
};

export default Users;