import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Scrollbars } from 'react-custom-scrollbars';
import _ from 'lodash';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import ConversationButton from '../CreateChat/index'
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';

import './ConversationList.css';

const ConversationList = function ({
  handleChangeConversation,
  conversationId,
  userId,
  socket,
  user,
  t
}) {
  const [chatRooms, setChatrooms] = useState([]);
  const [initialChats, setInitialChats] = useState([]);
  const [search, setSearch] = useState('');
  const userID = localStorage.getItem('currentUserId');

  const showChatList = async id => {
    try {
      const res = await axios.get(
        `/api/chat/showChatList`,
        {
          params: {
            id
          }
        }
      );
      setChatrooms(res.data);
      setInitialChats(res.data);
    } catch (error) {
      console.log('showChatList error:', error);
    }
  };

  const updateChatList = (userId) => {
    showChatList(userId);
    socket.emit('join_to_room', chatRooms);
  }

  const handleSearchRooms = event => {
    const updatedList = _.filter(initialChats, title => {
      return _.map(_.map(title.ChatRoom.UserChatRooms, 'User'), 'firstName')
        .join(' ,').toLowerCase().includes(event.target.value.toLowerCase());
    });
    setChatrooms(updatedList);
    setSearch(event.target.value);
  };

  useEffect(() => {
    updateChatList(userID || userId);
    if (!_.isEmpty(chatRooms)) {
      handleChangeConversation(chatRooms[0].chatRoomId)
    }
  }, [chatRooms.length]);


  return (
    <div className="conversation-list">
      <Toolbar
        title={t('Your chats')}
        leftItems={[
          <ToolbarButton key="cog" icon="ion-ios-cog" />
        ]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
        ]}
      />
      <Scrollbars
        autoHeight
        autoHeightMax={750}
      >
        <ConversationSearch
          handleSearchRooms={handleSearchRooms}
          search={search}
          t={t}
        />
        <ConversationButton
          userId={userId}
          user={user}
          chatRooms={chatRooms}
          updateChatList={updateChatList}
          t={t}
        />
        {
          !_.isEmpty(chatRooms) && chatRooms.map(chat =>
            <ConversationListItem
              key={chat.chatRoomId}
              data={chat}
              handleChangeConversation={handleChangeConversation}
              isActive={conversationId === chat.chatRoomId}
              t={t}
            />
          )
        }
      </Scrollbars>
    </div>
  );
}

export default (ConversationList);