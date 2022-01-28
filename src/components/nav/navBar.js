import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"


export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/analyze">Analyze</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/journalList">Journals</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="#" onClick={ () => {
                    localStorage.removeItem("kakeibo-user")
                    }
                }>
                    Logout</Link>
            </li>
        </ul>
    )
}