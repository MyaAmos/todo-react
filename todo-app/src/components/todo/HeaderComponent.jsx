import React, { Component } from "react";
import {
  NavLink
} from "react-router-dom";
import AuthenticationService from "./AuthenticationService.js";

class HeaderComponent extends Component {
    render() {
      const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
      //onsole.log(isUserLoggedIn);
  
      return (
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div>
              <a
                className="navbar-brand"
                href="https://www.linkedin.com/in/mya-amos-1305291bb/"
              >
                Mya Amos
              </a>
            </div>
            <ul className="navbar-nav">
              {isUserLoggedIn && (
                <li>
                  <NavLink className="nav-link" to="/welcome/mamos">
                    Home
                  </NavLink>
                </li>
              )}
              {isUserLoggedIn && (
                <li>
                  <NavLink className="nav-link" to="/todos">
                    Todos
                  </NavLink>
                </li>
              )}
            </ul>
            <ul className="navbar-nav navbar-collapse justify-content-end">
              {!isUserLoggedIn && (
                <li>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
              )}
              {isUserLoggedIn && (
                <li>
                  <NavLink
                    className="nav-link"
                    to="/logout"
                    onClick={AuthenticationService.logout}
                  >
                    Logout
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </header>
      );
    }
  }

  class FooterComponent extends Component {
    render() {
      return (
        <footer className="footer">
          <span className="text-muted">All Rights Reserved 2022 @mamos</span>
        </footer>
      );
    }
  }

  export default HeaderComponent;
  export {FooterComponent};
  