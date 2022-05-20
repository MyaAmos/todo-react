import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import withNavigation from "./WithNavigation.jsx";
import withParams from "../withParams.jsx";
import AuthenticationService from "./AuthenticationService.js";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import LoginComponent, {LogoutComponent} from "./LoginComponent.jsx";
import ListTodosComponent from "./ListTododsComponent.jsx";
import HeaderComponent, {FooterComponent} from "./HeaderComponent.jsx";
import WelcomeComponent from "./WelcomeComponent.jsx";
import TodoComponent from "./TodoComponent.jsx";

class TodoApp extends Component {
  render() {
    const LoginComponentWithNavigation = withNavigation(LoginComponent);
    const WelcomeComponentWithParams = withParams(WelcomeComponent);
    const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
    const ListTodosComponentWithNavigation = withNavigation(ListTodosComponent);
    const TodoComponentWithParamsAndNavigation = withParams(withNavigation(TodoComponent)); 

    return (
      <div className="TodoApp">
        <Router>
          <HeaderComponentWithNavigation />
          <Routes>
            <Route path="/" element={<LoginComponentWithNavigation />} />
            <Route path="/login" element={<LoginComponentWithNavigation />} />
            <Route
              path="/welcome/:name"
              element={
                <AuthenticatedRoute>
                  <WelcomeComponentWithParams />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodosComponentWithNavigation />
                </AuthenticatedRoute>
              }
            />
            <Route path="/logout" element={<LogoutComponent />}/>
            <Route path="/todos/:id" element={ 
              <AuthenticatedRoute>
                  <TodoComponentWithParamsAndNavigation />
              </AuthenticatedRoute>
            } />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
          <FooterComponent />
        </Router>

        {/*<LoginComponent/>
                <WelcomeComponent />*/}
      </div>
    );
  }
}

function ErrorComponent() {
  return (
    <div>
      An Error Occured. I don't know what to do! Contact support at... wait
      there is no one.
    </div>
  );
}



export default TodoApp;
