import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "./bootstrap-4.3.1-dist/css/bootstrap.min.css";
import LandingPage from "./pages/LandingPage";
import NavRoute from "./components/navbar/navbar";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import Login from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";

import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <NavRoute exact path="/home" component={Home} />

          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route exatct path="/login" component={Login} />

          <NavRoute exact path="/profile/:email" component={ProfilePage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
