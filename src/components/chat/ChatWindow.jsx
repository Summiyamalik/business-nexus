import { useState, useEffect, useRef } from 'react';

const ChatWindow = ({ recipient }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  // Mock initial messages
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: recipient.id,
        text: `Hi there! I'm interested in your startup.`,
        timestamp: new Date(Date.now() - 3600000)
      },
      {
        id: 2,
        sender: currentUser.name,
        text: 'Thanks for reaching out! What would you like to know?',
        timestamp: new Date(Date.now() - 1800000)
      }
    ]);
  }, [recipient, currentUser]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: messages.length + 1,
      sender: currentUser.name,
      text: newMessage,
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Chat with {recipient.name}</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id}
            className={`flex ${message.sender === currentUser.name ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${message.sender === currentUser.name 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-800'}`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === currentUser.name ? 'text-blue-100' : 'text-gray-500'}`}>
                {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;