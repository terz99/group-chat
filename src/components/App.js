import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import "./App.css";
import chat from "../utils/ComeChatManager";
import Login from "./Login";
import GroupChat from "./GroupChat";

class App extends React.Component {

  constructor(props) {
    super(props);
    chat.init()
      .catch((error) => console.error(error));
  }

  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/chat" component={GroupChat} />
      </Switch>
    );
  }
}

export default App;