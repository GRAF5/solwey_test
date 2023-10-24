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
                  <td>{user.email}</td>
                  <td><select onChange={set} id="role" value={change.role}>
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select></td>
                  <td className="control">
                    <button className="green min" onClick={updateUser}>&#10004;</button>
                    &nbsp;
                    <button className="danger min" onClick={() => setChange({})}>&#10006;</button>
                  </td>
                </tr>
                </React.Fragment> :
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="control"><button onClick={() => setChange(user)}>Change</button></td>
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