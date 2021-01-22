import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');
const mapStateToProps = ({ user }) => ({ user });

const Messenger = function ({ user }) {
  const { t } = useTranslation();
  const [conversationId, setConversationId] = React.useState(null);
  const [conversationName, setConversationName] = React.useState('Conversation');

  const handleChangeConversation = (id, name )=> {
    setConversationId(id);
    setConversationName(name);
  }

 return (
    <div className="messenger">
      <div className="scrollable sidebar">
        <ConversationList
          userId={user.user.id}
          user={user}
          handleChangeConversation={handleChangeConversation}
          conversationId={conversationId}
          socket={socket}
          t={t}
        />
      </div>

      <div className="scrollable content">
        <MessageList
          conversationId={conversationId}
          conversationName={conversationName}
          userId={user.user.id}
          socket={socket}
          user={user}
          t={t}
        />
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Messenger);
