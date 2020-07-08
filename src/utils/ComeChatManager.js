import {CometChat} from "@cometchat-pro/chat/CometChat";
import config from "./config";

export default class ComeChatManager {
  static LISTENER_KEY_MESSAGE = "msglistener";
  static appId = config.appId;
  static apiKey = config.apiKey;
  static LISTENER_KEY_GROUP = "grouplistener";

  static init() {
    return CometChat.init(ComeChatManager.appId);
  }

  static getTextMessage(uid, txt, msgType) {
    if (msgType === "user") {
      return new CometChat.TextMessage(
        uid,
        txt,
        CometChat.RECEIVER_TYPE.USER
      );
    } else {
      return new CometChat.TextMessage(
        uid,
        txt,
        CometChat.RECEIVER_TYPE.GROUP
      );
    }
  }

  static getLoggedInUser() {
    return CometChat.getLoggedinUser();
  }

  static login(uid) {
    return CometChat.login(uid, ComeChatManager.apiKey);
  }

  static getGroupMessages(guid, callback, limit = 30) {
    const messagesRequest = new CometChat.MessagesRequestBuilder()
      .setGUID(guid)
      .setLimit(30)
      .build();
    callback();
    return messagesRequest.fetchPrevious();
  }

  static sendGroupMessage(uid, message) {
    const textMessage = this.getTextMessage(uid, message, "group");
    return CometChat.sendMessage(textMessage);
  }

  static joinGroup(guid) {
    return CometChat.joinGroup(guid, CometChat.GROUP_TYPE.PUBLIC, "");
  }

  static addMessageListener(callback) {
    CometChat.addMessageListener(
      this.LISTENER_KEY_MESSAGE,
      new CometChat.MessageListener({
        onTextMessageReceived: textMessage => {
          callback(textMessage);
        }
      })
    );
  }
}