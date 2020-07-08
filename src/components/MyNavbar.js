import React from "react";
import { Navbar } from 'react-chat-elements';

function MyNavbar() {
  return (
    <Navbar
      className={'navbar'}
      type={'dark'}
      left={
        <h2>Plancraft GroupChat</h2>
      }
      />
  );
}

export default MyNavbar;