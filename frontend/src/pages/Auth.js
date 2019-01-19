import React, { Component } from "react";
import "./Auth.css";
import AuthContext from "../context/auth-context";

class AuthPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true
    };

    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  static contextType = AuthContext;

  switchModeHandler = () => {
    this.setState(prevState => {
      return {
        isLogin: !prevState.isLogin
      };
    });
  };
  submitHandler = e => {
    e.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    if (email.trim().lenght === 0 || password.trim().length === 0) {
      return;
    }
    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };
    if (!this.state.isLogin) {
      requestBody = {
        query: `
        mutation {
          createUser(userInput:{ email: "${email}", password:"${password}" }){
            _id
            email
          }
        }
        `
      };
    }
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
        console.log(resData);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <form className="auth-form" onSubmit={e => this.submitHandler(e)}>
        <div className="form-control">
          <label htmlFor="email">E-mail </label>
          <input type="email" id="email" ref={this.emailEl} />
        </div>
        <div className="form-control">
          <label htmlFor="email">Password </label>
          <input type="password" id="password" ref={this.passwordEl} />
        </div>
        <div className="form-actions">
          <button type="submit">Submit</button>
          <button type="button" onClick={this.switchModeHandler}>
            Switch to {this.state.isLogin ? "Sign up" : "Login"}
          </button>
        </div>
      </form>
    );
  }
}

export default AuthPage;
