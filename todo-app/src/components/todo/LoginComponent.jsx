import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService.js";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "mamos",
      password: "",
      hasLoginFailed: false,
      showSuccessMessage: false,
    };

    // this.handleUsernameChange = this.handleUsernameChange.bind(this);
    // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange(event) {
    //console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  // handlePasswordChange(event){
  //     //console.log(event.target.value);
  //     this.setState({password:event.target.value});
  // }

  // handleUsernameChange(event){
  //     //console.log(event.target.value);
  //     this.setState({[event.target.name]:event.target.value});
  // }

  loginClicked() {
    //mamos, dummy
    // if (this.state.username === "mamos" && this.state.password === "dummy") {
    //   AuthenticationService.registerSuccessfulLogin(
    //     this.state.username,
    //     this.state.password
    //   );
    //   this.props.navigate(`/welcome/${this.state.username}`);
    //   // this.setState({showSuccessMessage:true});
    //   // this.setState({hasLoginFailed:false});
    // } else {
    //   this.setState({ showSuccessMessage: false });
    //   this.setState({ hasLoginFailed: true });
    // }

    AuthenticationService.executeBasicAuthenticationService(
      this.state.username,
      this.state.password
    )
      .then(() => {
        AuthenticationService.registerSuccessfulLogin(
          this.state.username,
          this.state.password
        );
        this.props.navigate(`/welcome/${this.state.username}`);
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
      });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="container">
          {/*<ShowInvalidCredentials hasLoginFailed = {this.state.hasLoginFailed}/>*/}
          {this.state.hasLoginFailed && (
            <div className="alert alert-warning">Invalid Credentials</div>
          )}
          {/*<ShowLoginSuccess showSuccessMessage={this.state.showSuccessMessage}/>*/}
          {this.state.showSuccessMessage && <div>Login Successful</div>}
          Username:{" "}
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          Password:{" "}
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button className="btn btn" onClick={this.loginClicked}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

// function ShowInvalidCredentials(props){
//     if (props.hasLoginFailed){
//         return (<div>Invalid Credentials</div>);
//     }
//     return null;
// }

// function ShowLoginSuccess(props){
//     if (props.showSuccessMessage){
//         return (<div>Login Successful</div>);
//     }
//     return null;
// }

class LogoutComponent extends Component {
  render() {
    return (
      <div>
        <h1>You are logged out</h1>
        <div className="container">Thank you for using our Application</div>
      </div>
    );
  }
}

export default LoginComponent;
export { LogoutComponent };
