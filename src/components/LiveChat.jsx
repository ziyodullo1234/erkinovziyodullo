import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, push, onValue } from "firebase/database";
import "../styles/LiveChat.css";

function LiveChat() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const chatRef = ref(db, "messages");
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.values(data);
        setMessages(arr);
      }
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    const chatRef = ref(db, "messages");
    push(chatRef, {
      text,
      date: new Date().toLocaleString(),
    });
    setText("");
  };

  return (
    <div className="chat-container">
      <h2>💬 Live Chat</h2>
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className="chat-msg">
            <p>{msg.text}</p>
            <span>{msg.date}</span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-input">
        <input
          type="text"
          value={text}
          placeholder="Write your message..."
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default LiveChat;
