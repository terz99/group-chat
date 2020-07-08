import { MessageList } from 'react-chat-elements';
import React from "react";

function MyMessageList(props) {
  const renderMessages = (messageList, uid) => {
    if (!uid || !messageList || messageList.length === 0) {
      return [];
    }
    return messageList.map(data => {
      return {
        position: data.sender.uid === uid ? 'right' : 'left',
        type: 'text',
        'text': data.data.text,
        date: data.sentAt * 1000,
        avatar: data.sender.avatar,
        title: data.sender.name
      };
    });
  }

  return (
    <MessageList
      className='message-list'
      lockable={true}
      toBottomHeight={'100%'}
      dataSource={renderMessages(props.messages, props.uid)} />
  );
}

export default MyMessageList;