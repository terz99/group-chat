import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";
import App from "./components/App";
import "./index.css";
import 'react-chat-elements/dist/main.css';


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);