import React, {useEffect, useRef, useState} from "react";
import { Redirect } from "react-router-dom";

import "../index.css";
import chat from "../utils/ComeChatManager";
import config from "../utils/config";
import MyMessageList from "./MyMessageList";
import MyNavbar from "./MyNavbar";

function GroupChat(props) {
  const [isAuth, setIsAuth] = useState(true);
  const [groupMessage, setGroupMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [messageText, setMessageText] = useState(null);
  const scrollableElement = useRef(null);
  const guid = config.guid;

  const scrollToBottom = () => {
    scrollableElement.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }

  useEffect(() => {
    const getUser = () => {
      chat
        .getLoggedInUser()
        .then(newUser => {
          setUser(newUser);
        }).catch((error) => {
        if (error.code === "USER_NOT_LOGGED_IN") {
          setIsAuth(false);
        }
      });
    }

    if (!user) {
      getUser();
    }
  }, [user]);


  const updateGroupMessages = (newGroupMessage) => {
    if (!groupMessage) {
      setGroupMessage([...newGroupMessage]);
    } else {
      setGroupMessage(groupMessage.concat(newGroupMessage));
    }
    scrollToBottom();
  }

  useEffect(() => {
    const messageListener = () => {
      chat.addMessageListener((data, error) => {
        if (error) {
          return console.log(`error: ${error}`);
        }
        updateGroupMessages(data);
      });
    }

    const fetchGroupMessages = async () => {
      return chat.getGroupMessages(guid, () => {});
    }

    messageListener();
    if (!groupMessage) {
      fetchGroupMessages()
        .then(data => {
          updateGroupMessages(data);
        })
        .catch(err => console.error(err));
    }
  });

  const sendMessage = () => {
    chat.sendGroupMessage(guid, messageText)
      .then(
        (message) => {
          setMessageText(null);
          updateGroupMessages(message);
        },
        error => {
          if (error.code === "ERR_NOT_A_MEMBER") {
            chat.joinGroup(guid).then((res) => sendMessage());
          }
        }
      );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    e.target.reset();
  }

  const handleChange = (e) => {
    setMessageText(e.target.value);
  }

  if (!isAuth) {
    return (<Redirect to="/" />);
  }

  return (
    <div className="chatWindow">
      <MyNavbar />
      <MyMessageList
      id="chatList"
      messages={groupMessage}
      uid={user ? user.uid : null}
      />
      <div id={'scrollableElement'} ref={scrollableElement}/>
      <div className="chatInputWrapper my-input">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className="textarea input"
            type="text"
            placeholder="Enter your message..."
            onChange={(e) => handleChange(e)}
          />
        </form>
      </div>
    </div>
  );
}

export default GroupChat;