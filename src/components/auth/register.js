import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./login.css";

export const Register = (props) => {
  const [user, setUser] = useState({});
  const conflictDialog = useRef();

  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${user.email}`)
      .then((res) => res.json())
      .then((user) => !!user.length);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    existingUserCheck().then((userExists) => {
      if (!userExists) {
        fetch("http://localhost:8088/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("kakeibo-user", createdUser.id);
              history.push("/");
            }
          });
      } else {
        conflictDialog.current.showModal();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>Account with that email address already exists</div>
        <button
          className="button--close"
          onClick={(e) => conflictDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Register your Kakeibo on the Go user account!
        </h1>
        <fieldset>
          
          <input
            onChange={updateUser}
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          
          <input
            onChange={updateUser}
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <Button color="success" variant="contained" type="submit"> Register </Button>
        </fieldset>
      </form>
    </main>
  );
};
