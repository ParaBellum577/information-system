import React, { useEffect, useState } from 'react';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { Scrollbars } from 'react-custom-scrollbars';
// import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';

import Compose from '../Compose';
import Toolbar from '../Toolbar';
import Message from '../Message';

import './MessageList.css';
import styles from '../CreateChat/index.module.scss';


const MessageList = function ({ userId, user, conversationId, conversationName, t, socket }) {
  const [showOptionLimit, setOptionLimit] = useState(10);
  const [messages, setMessages] = useState([]);
  const messageEnd = React.useRef();
  const userID = localStorage.getItem('currentUserId');

  const loadMoreMessages = () => {
    setOptionLimit(showOptionLimit + 4);
  };

  const getMessages = async (chatRoomId, id) => {
    try {
      const res = await axios.post(
        `/api/message/showMessageAll`,
        { chatRoomId },
        {
          params: {
            id
          }
        }
      );
      setMessages(res.data);
    } catch (error) {
      console.log('showMessageAll error:', error);
    }
  }
  socket.on('message_send', message => {
    let arr = messages.map(e => e);
    setMessages([...arr, message])
  });

  useEffect(() => {
    getMessages(conversationId, userID);
  }, [conversationId]);


  const scrollToBottom = () => {
    if (messageEnd.current) {
      messageEnd.current.scrollIntoView(
        // {
        //   block: 'start',
        //   behavior: 'smooth',
        // }
      );
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      let isMine = current.author === userId;
      let currentMoment = moment(current.timestamp);
      let prevBySameAuthor = false;
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(currentMoment.diff(previousMoment));
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as('hours') < 1) {
          startsSequence = false;
        }

        if (previousDuration.as('hours') < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.createdAt);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as('hours') < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  }

  // const renderMessages = () => {
  //   if (!_.isEmpty(messages)) {
  //     const renderMessage = messages.map(comment => (
  //         <Message
  //         key={comment.id}
  //         isMine={userId === comment.author}
  //         startsSequence={true}
  //         endsSequence={true}
  //         showTimestamp={false}
  //         data={comment}
  //       />
  //     ))
  //     return renderMessage
  //   }
  // };
  return (
    <>
      <Toolbar
        title={conversationName}
      />
      <Scrollbars
        autoHeight
        autoHeightMin={750}
        autoHeightMax={750}
      >
        <div className="message-list">
          {
            !_.isEmpty(messages) && conversationId !== null ?
              <div className="message-list-container">
                {/* <InfiniteScroll
                  pageStart={0}
                  loadMore={loadMoreMessages}
                  hasMore={messages.length > showOptionLimit}
                > */}
                {renderMessages()}
                {/* </InfiniteScroll> */}
                <span className={styles.lastMessage} ref={messageEnd} />
              </div>
              :
              <div className={styles.emptyMessageList}>
                <BiMessageRoundedDots size="200px" color="#d8d8d8" />
                <h2>No messages yet</h2>
              </div>
          }
        </div>
      </Scrollbars>
      <Compose
        t={t}
        userId={userId}
        conversationId={conversationId}
        user={user}
        getMessages={getMessages}
        socket={socket}
      />
    </>
  );
}

export default MessageList;
