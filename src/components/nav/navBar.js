import React from "react";
import "./navbar.css";
import { Button } from "@mui/material";

export const NavBar = () => {
  return (
    <div className="navbar">
      <Button
        variant="contained"
        href="/"
        color="success"
        className="navbar__item active"
      >
        Home
      </Button>
      <Button
        variant="contained"
        color="success"
        href="/analyze"
        className="navbar__item active"
      >
        Analyze
      </Button>
      <Button
        variant="contained"
        color="success"
        href="/journalList"
        className="navbar__item active"
      >
        Journals
      </Button>
      <Button
        variant="contained"
        color="success"
        href="#"
        className="navbar__item active"
        onClick={() => {
          localStorage.removeItem("kakeibo-user");
        }}
      >
        Logout
      </Button>
    </div>
  );
};
