import React from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";
import "./MainNavigation.css";

const mainNavigation = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <header className="main-navigation">
          <div className="main-navigagtion__logo">
            <Link to="/">
              <h1>Easy Events</h1>
            </Link>
          </div>
          <nav className="main-navigation__items">
            <ul>
              {!context.token && (
                <li>
                  <NavLink to="/auth"> Authentication </NavLink>
                </li>
              )}
              <li>
                <NavLink to="/events"> Events </NavLink>
              </li>

              {context.token && (
                <React.Fragment>
                  <li>
                    <NavLink to="/bookings">Bookings </NavLink>
                  </li>

                  <li>
                    <button onClick={context.logout}> Logout</button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </nav>
        </header>
      );
    }}
  </AuthContext.Consumer>
);

export default mainNavigation;
