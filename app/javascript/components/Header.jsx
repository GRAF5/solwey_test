import React, { useState } from "react";
import { Link, useLocation  } from "react-router-dom";
import "./Header.css";
import useWindowSize from "../hooks/useWindowSize";

const Header = ({user, logout, cart}) => {
  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);
  const { isMobile } = useWindowSize();

  const link = (path, text) => <Link 
    onClick={() => {
      setSidebar(false);
      closeAdminDetails();
    }}
    className={location.pathname === path ? "active" : ""} 
    to={path}>{text}</Link>;

  const closeAdminDetails = () => document
    .getElementById('administration-details')
    ?.removeAttribute('open');
  
  const cangeSidebarVisible = () => setSidebar(!sidebar);
  
  return (
    <>
      <header>
        <div>
          {
            isMobile ?
              sidebar ?
              <svg 
                className="a"
                onClick={cangeSidebarVisible}
                xmlns="http://www.w3.org/2000/svg"  
                viewBox="0 0 50 50" 
                width="25px" 
                height="25px"
                fill="#FFFFFF">
                <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"/>
              </svg> :
              <svg 
                className="a"
                onClick={cangeSidebarVisible}
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                height="25px" 
                width="25px" 
                fill="#FFFFFF">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg> :
            <>
              {link("/", "Home")}
              {link("/items", "Сatalog")}
              {user && link("/orders", "Orders")}
              {user?.role === 'admin' && 
                <details id="administration-details" className="a">
                  <summary>Administration</summary>
                  <ul>
                    <li onClick={closeAdminDetails}>{link("/admin/users", "Users")}</li>
                    <li onClick={closeAdminDetails}>{link("/admin/items", "Items")}</li>
                  </ul>
                </details>}
            </>
          }
        </div>
        <div>
          {
            user ? <>
              <Link to={`/users/${user.id}`} style={{whiteSpace: "nowrap"}}>Hi, {user.firstName} {user.lastName}</Link>
              <Link to="/cart">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20px" 
                height="20px" 
                viewBox="0 0 902.86 902.86">
                <g>
                  <g>
                    <path fill="currentColor" d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
                      M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"/>
                    <path fill="currentColor" d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
                      c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
                      c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
                      C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
                      c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
                      M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
                      S619.162,694.432,619.162,716.897z"/>
                  </g>
                </g>
              </svg>
              {
                cart.length ? <div className="badge">
                  <small>{cart.length}</small>
                </div> : <></>
              }
              </Link>
              <Link onClick={logout} to="/">Logout</Link>
            </> : <>
              <Link to="/signin">Sign in</Link>
              <Link to="/signup">Sign up</Link>
            </>
          }
        </div>
      </header>
      {
        sidebar && <div className="sidebar">
          {link("/", "Home")}
          {link("/items", "Сatalog")}
          {user && link("/orders", "Orders")}
          {user?.role === 'admin' && 
            <details id="administration-details" className="a">
              <summary>Administration</summary>
              <ul>
                <li onClick={closeAdminDetails}>{link("/admin/users", "Users")}</li>
                <li onClick={closeAdminDetails}>{link("/admin/items", "Items")}</li>
              </ul>
            </details>}
        </div>
      }
    </>
  )
};

export default Header;