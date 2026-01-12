import React, { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState("");
  const currentUser = { username: "Charlie" };

  // Fetch messages on first render
  useEffect(() => {
    fetch("http://127.0.0.1:5555/messages")
      .then((r) => r.json())
      .then(setMessages);
  }, []);

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:5555/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: currentUser.username, body }),
    })
      .then((r) => r.json())
      .then((newMessage) => {
        setMessages([...messages, newMessage]);
        setBody("");
      });
  }

  return (
    <div>
      <h1>Chatterbox</h1>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <b>{msg.username}:</b> {msg.body}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
