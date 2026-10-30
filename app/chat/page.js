"use client";

import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function ChatPage() {
  const socketRef = useRef(null);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000"
    );

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to Socket.io:", socket.id);
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("chat:message", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!message.trim() || !socketRef.current?.connected) return;

    socketRef.current.emit("chat:message", message.trim());

    setMessage("");
  };

  return (
    <main style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <h1>Cine-Stream Real-Time Chat</h1>

      <p>
        Server Status:{" "}
        <strong style={{ color: connected ? "green" : "red" }}>
          {connected ? "Connected" : "Disconnected"}
        </strong>
      </p>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          minHeight: "300px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {messages.length === 0 ? (
          <p>No messages yet. Start chatting!</p>
        ) : (
          messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))
        )}
      </div>

      <form onSubmit={sendMessage} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          disabled={!connected}
          style={{
            padding: "12px 25px",
            cursor: connected ? "pointer" : "not-allowed",
          }}
        >
          Send
        </button>
      </form>
    </main>
  );
}