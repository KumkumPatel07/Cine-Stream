"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function ChatPage() {
  const socketRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const [username, setUsername] = useState("");
  const [usernameInput, setUsernameInput] = useState("");

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [connected, setConnected] = useState(false);
  const [joined, setJoined] = useState(false);
  const [room, setRoom] = useState("General");
  const [typingUser, setTypingUser] = useState("");

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeoutRef.current);
      socketRef.current?.disconnect();
    };
  }, []);

  // Join Chat
  const joinChat = (e) => {
    e.preventDefault();

    const name = usernameInput.trim();

    if (!name) return;

    setUsername(name);
    setJoined(true);

    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000"
    );

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to Socket.io:", socket.id);

      setConnected(true);

      socket.emit("chat:join", "General");
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    // Receive messages
    socket.on("chat:message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    // Receive typing status
    socket.on("chat:typing", (data) => {
      setTypingUser(data.isTyping ? data.username : "");
    });
  };

  // Change Chat Room
  const handleRoomChange = (e) => {
    const selectedRoom = e.target.value;

    setRoom(selectedRoom);
    setMessages([]);
    setTypingUser("");

    clearTimeout(typingTimeoutRef.current);

    if (socketRef.current?.connected) {
      socketRef.current.emit("chat:typing", {
        username,
        isTyping: false,
      });

      socketRef.current.emit("chat:join", selectedRoom);
    }
  };

  // Send Message
  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim() || !socketRef.current?.connected) return;

    clearTimeout(typingTimeoutRef.current);

    socketRef.current.emit("chat:typing", {
      username,
      isTyping: false,
    });

    socketRef.current.emit("chat:message", {
      username,
      text: message.trim(),
    });

    setMessage("");
  };

  // Detect Typing
  const handleTyping = (e) => {
    const value = e.target.value;

    setMessage(value);

    if (!socketRef.current?.connected) return;

    socketRef.current.emit("chat:typing", {
      username,
      isTyping: true,
    });

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current?.emit("chat:typing", {
        username,
        isTyping: false,
      });
    }, 1500);
  };

  return (
    <main style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h1>Cine-Stream Real-Time Chat</h1>

      {!joined ? (
        <form
          onSubmit={joinChat}
          style={{ display: "flex", gap: "10px", marginTop: "30px" }}
        >
          <input
            type="text"
            placeholder="Enter your username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <button type="submit" disabled={!usernameInput.trim()}>
            Join Chat
          </button>
        </form>
      ) : (
        <>
          <p>
            Welcome, <strong>{username}</strong>!
          </p>

          <p>
            Server Status:{" "}
            <strong style={{ color: connected ? "green" : "red" }}>
              {connected ? "Connected" : "Disconnected"}
            </strong>
          </p>

          {/* Room Selection */}
          <div style={{ marginTop: "20px" }}>
            <label htmlFor="room">
              <strong>Select Chat Room: </strong>
            </label>

            <select
              id="room"
              value={room}
              onChange={handleRoomChange}
              disabled={!connected}
              style={{
                padding: "10px",
                borderRadius: "6px",
                marginLeft: "10px",
              }}
            >
              <option value="General">General</option>
              <option value="Tech Support">Tech Support</option>
            </select>
          </div>

          <h3 style={{ marginTop: "20px" }}>
            Current Room: {room}
          </h3>

          {/* Messages */}
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              minHeight: "300px",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            {messages.length === 0 ? (
              <p>No messages in this room yet. Start chatting!</p>
            ) : (
              messages.map((msg, index) => (
                <p key={index}>
                  <strong>[{msg.username}]:</strong> {msg.text}
                </p>
              ))
            )}
          </div>

          {/* Typing Indicator */}
          {typingUser && typingUser !== username && (
            <p style={{ color: "gray", fontStyle: "italic" }}>
              {typingUser} is typing...
            </p>
          )}

          {/* Message Input */}
          <form
            onSubmit={sendMessage}
            style={{ display: "flex", gap: "10px", marginTop: "15px" }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={handleTyping}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />

            <button type="submit" disabled={!connected}>
              Send
            </button>
          </form>
        </>
      )}
    </main>
  );
}