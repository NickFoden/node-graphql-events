import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./MainNavigation.css";

const mainNavigation = props => (
  <header className="main-navigation">
    <div className="main-navigagtion__logo">
      <Link to="/">
        <h1>the Navbar</h1>
      </Link>
    </div>
    <nav className="main-navigation__items">
      <ul>
        <li>
          <NavLink to="/auth"> Authentication </NavLink>
        </li>
        <li>
          <NavLink to="/events"> Events </NavLink>
        </li>

        <li>
          <NavLink to="/bookings">Bookings </NavLink>
        </li>
      </ul>
    </nav>
  </header>
);

export default mainNavigation;
