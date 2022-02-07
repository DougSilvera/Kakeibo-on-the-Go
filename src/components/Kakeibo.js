import React from "react";
import { Route, Redirect } from "react-router-dom";
import ApplicationViews from "./ApplicationViews";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { NavBar } from "./nav/NavBar";
import headerImage from "./KakeiboHeaderImage.png"

export const Kakeibo = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("kakeibo-user")) {
          return (
            <>
              <h1 className="header_main"><img src={headerImage}/></h1>
              <NavBar />
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);
