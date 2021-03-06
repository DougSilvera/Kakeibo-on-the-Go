import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./login.css";
import logo from "./Kakeibo on the Go.png"
import { Button,r } from "@mui/material";

export const Login = () => {
  const [email, set] = useState("");
  const existDialog = useRef();
  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((user) => (user.length ? user[0] : false));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    existingUserCheck().then((exists) => {
      if (exists) {
        localStorage.setItem("kakeibo-user", exists.id);
        history.push("/");
      } else {
        existDialog.current.showModal();
      }
    });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1><img src={logo} className="logoMain" alt="logo"/></h1>
          <h2>Please sign in</h2>
          <fieldset className="loginEmail">
           
            <input
              type="email"
              onChange={(evt) => set(evt.target.value)}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
           

            <Button variant="contained" color="success" type="submit">Sign in</Button>

           
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
