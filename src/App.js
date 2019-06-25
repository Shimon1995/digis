import React from "react";
// import { Provider } from "react-redux";
// import { ReactDOM } from "react-dom";
import { HashRouter, Route, NavLink } from "react-router-dom";

import Auth from "./partials/Authorization";
import Main from "./partials/Main";
import About from "./partials/About";
import Map from "./partials/Map";
import "./App.less";

import "milligram";
import "./App.less";

const App = () => {
  return (
    <HashRouter>
      <div className="App container">
        <h1>SPA</h1>
        <ul>
          <li>
            <NavLink to="/auth">Authorization</NavLink>
          </li>
          <li>
            <NavLink to="/main">Main Page</NavLink>
          </li>
          <li>
            <NavLink to="/about">About Author</NavLink>
          </li>
          <li>
            <NavLink to="/map">Map</NavLink>
          </li>
        </ul>
        <div className="content">
          <Route path="/auth" component={Auth} />
          <Route path="/main" component={Main} />
          <Route path="/about" component={About} />
          <Route path="/map" component={Map} />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;
