import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChatWindow from './chatwindow';
import InputField from './inoutfield';
import Webcam from 'react-webcam';

const socket = io('http://localhost:5000'); // Replace with your server URL

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = (message) => {
    socket.emit('message', message);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div >
     
     
      <ChatWindow messages={messages} sendMessage={sendMessage} />

    </div>
  );
};

export default App;