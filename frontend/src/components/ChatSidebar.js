import React from "react";

const ChatSidebar = ({ chatMessages }) => (
  <div className="sidebar">
    <h2>Previous Chats</h2>
    <ul>
      {chatMessages.map((msg, index) => (
        <li key={index}>
          <strong>Query:</strong> {msg.queryText}
          <br />
          <strong>Response:</strong> {msg.responseText}
        </li>
      ))}
    </ul>
  </div>
);

export default ChatSidebar;
