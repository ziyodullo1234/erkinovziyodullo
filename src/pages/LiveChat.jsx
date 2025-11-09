import React, { useState, useEffect, useRef } from "react";
import "../styles/LiveChat.css";

const LiveChat = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Salom! Sayt sizga yoqdimi? 😊", sender: "bot" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Bot javobi (imitatsiya)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: "Rahmat! Sizning fikringiz biz uchun muhim 💬", sender: "bot" },
      ]);
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="telegram-chat-container">
      <div className="telegram-header">Live Chat 💬</div>

      <div className="telegram-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`telegram-message ${msg.sender === "user" ? "user-message" : "bot-message"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="telegram-input-area">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Xabaringizni yozing..."
        />
        <button onClick={handleSendMessage}>➤</button>
      </div>
    </div>
  );
};

export default LiveChat;
