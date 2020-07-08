import React, {useState} from "react";
import {Redirect} from "react-router-dom";

import chat from "../utils/ComeChatManager";
import spinner from "../images/logo.svg";
import "../index.css";

function Login(props) {

  const [username, setUsername] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleSubmitting = () => {
    setIsSubmitting(!isSubmitting);
  }

  const login = () => {
    toggleSubmitting();
    chat.login(username)
      .then(newUser => {
        setUser(newUser);
        setIsAuth(true);
      }).catch(error => {
        setErrorMessage("The username does not exist");
        toggleSubmitting();
        console.error(error);
    });
  }

  const submit = (e) => {
    if (username.length !== 0) {
      e.preventDefault();
      login();
    }
  }

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  }

  if (isAuth) {
    return (
      <Redirect
      to={{
        pathname: "/chat",
        state: { user: user }
      }} />
    );
  }

  return (
    <div className="App">
      <img src={spinner} alt={'logo'}/>
      <h1>Plancraft Chat</h1>
      <h4>This is a prototype. Please use one of the following usernames:</h4>
      <ul>
        <li><h5>superhero1</h5></li>
        <li><h5>superhero2</h5></li>
        <li><h5>superhero3</h5></li>
        <li><h5>superhero4</h5></li>
        <li><h5>superhero5</h5></li>
      </ul>
      <form className="form" onSubmit={(e) => submit(e)}>
        <input onChange={(e) => handleInputChange(e)} type="text" placeholder={'Username'}/>
        <span className="error">{errorMessage}</span>
        {isSubmitting ? (
          <img src={spinner} alt="Spinner component" className="App-logo" />
        ) : (
          <input
            type="submit"
            disabled={username === ""}
            value="LOGIN"
          />
        )}
      </form>
    </div>
  );
}

export default Login;