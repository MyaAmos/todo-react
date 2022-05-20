import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import HelloWorldService from "../api/todo/HelloWorldService";

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      welcomeMessage: " ",
      errorMessage: " ",
      isError: false
    };

    this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
    this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  render() {
    return (
      <div>
          {this.state.isError && (
            <div className="alert alert-warning">{this.state.errorMessage}</div>
          )}
        <h1>Welcome!</h1>
        <div className="container">
          Welcome {this.props.params.name}. You can manage your todos{" "}
          <NavLink to="/todos">here</NavLink>
        </div>
        <div className="container">
          Click here to get a customized welcome message.
          <button className="btn btn" onClick={this.retrieveWelcomeMessage}>
            Get Welcome Message
          </button>
        </div>
        <div className="container">{this.state.welcomeMessage}</div>
      </div>
    );
  }

  retrieveWelcomeMessage() {
    //HelloWorldService.executeHelloWorldBeanService().then(response => this.handleSuccessfulResponse(response));
    HelloWorldService.executeHelloWorldPathVariableService(
      this.props.params.name
    )
      .then((response) => this.handleSuccessfulResponse(response))
      .catch((error) => this.handleError(error));
  }

  handleSuccessfulResponse(response) {
    this.setState({ welcomeMessage: response.data.message });
    this.setState({ isError: false });
  }

  handleError(error) {
    let errorMessage = ''
    if (error.message){
      errorMessage += error.message
    }

    if(error.response && error.response.data){
      errorMessage += error.message
    }
    this.setState({ errorMessage: errorMessage});
    this.setState({ isError: true });
    //this.setState({welcomeMessage: response.da})
  }
}

export default WelcomeComponent;
