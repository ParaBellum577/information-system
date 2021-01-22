import React, { useState, useEffect } from 'react';
import shave from 'shave';
import _ from 'lodash';
import './ConversationListItem.css';

export default function ConversationListItem({ data, handleChangeConversation, isActive }) {
  const [conversatioName, setConversatioName] = useState();

  useEffect(() => {
    const name = data.ChatRoom.UserChatRooms && !_.isEmpty(data.ChatRoom.UserChatRooms) &&
    data.ChatRoom.UserChatRooms.map(room => {
      return room.User.firstName
    })
    setConversatioName(name.join(', '))
    handleChangeRoom();
    shave('.conversation-snippet', 20);
  }, [data, conversatioName])

  const handleChangeRoom = () => {
    handleChangeConversation(data.chatRoomId, conversatioName);
  } 

  return (
    <>
      { data &&
        <div onClick={handleChangeRoom} className={isActive ? "conversation-list-item active" : "conversation-list-item"}>
          <img className="conversation-photo" src={data.avatar} alt="" />
          <div className="conversation-info">
            <h1 className="conversation-title" title={conversatioName}>{conversatioName}</h1>
          </div>
        </div>
      }
    </>
  );
}