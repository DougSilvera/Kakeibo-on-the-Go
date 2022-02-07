import React from "react";
import "./navbar.css";
import Link from '@mui/material/Link';

export const NavBar = () => {
  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link underline="hover" href="/" underclassName="navbar__link" >
          Home
        </Link>
      </li>
      <li className="navbar__item active">
        <Link underline="hover" href="/analyze"className="navbar__link">
          Analyze
        </Link>
      </li>
      <li className="navbar__item active">
        <Link underline="hover" href="/journalList" className="navbar__link">
          Journals
        </Link>
      </li>
      <li className="navbar__item active">
        <Link underline="hover" href="#"
          className="navbar__link"
          
          onClick={() => {
            localStorage.removeItem("kakeibo-user");
          }}
        >
          Logout
        </Link>
      </li>
    </ul>
  );
};
