import React, { Component } from "react";
import "./Auth.css";

class AuthPage extends Component {
  render() {
    return (
      <form className="auth-form">
        <div className="form-control">
          <label htmlFor="email">E-mail </label>
          <input type="email" id="email" />
        </div>
        <div className="form-control">
          <label htmlFor="email">Password </label>
          <input type="password" id="password" />
        </div>
        <div className="form-actions">
          <button type="button">Switch to sign up</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
