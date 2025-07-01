import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');

  const sendMessage = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/chat', { message });
      setReply(res.data.reply);
    } catch (err) {
      console.error(err);
      setReply("Error connecting to server.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Chatbot Demo</h2>
      <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Ask something..." />
      <br/>
      <button onClick={sendMessage}>Send</button>
      <h3>Bot:</h3>
      <p>{reply}</p>
    </div>
  );
}

export default App;
