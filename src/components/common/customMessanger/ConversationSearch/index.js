import React from 'react';
import './ConversationSearch.css';

export default function ConversationSearch({handleSearchRooms, search, t}) {
    return (
      <div className="conversation-search">
        <input
          onChange={handleSearchRooms}
          value={search}
          type="search"
          className="conversation-search-input"
          placeholder={t("Search Chats")}
        />
      </div>
    );
}