import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'

const ChatPage = () => {
  const { userId } = useParams()
  const { user: currentUser } = useAuth()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)

  // Mock other user data
  const otherUser = {
    id: userId,
    name: userId === 'ent1' ? 'Sarah Entrepreneur' : 'Mark Investor',
    type: userId === 'ent1' ? 'entrepreneur' : 'investor',
    avatar: userId === 'ent1' ? '/avatars/entrepreneur1.jpg' : '/avatars/investor1.jpg',
    online: true
  }

  useEffect(() => {
    // Mock initial messages
    const initialMessages = [
      {
        id: 1,
        sender: otherUser.id,
        text: 'Hello! I came across your profile and was impressed with your work.',
        timestamp: new Date(Date.now() - 86400000)
      },
      {
        id: 2,
        sender: currentUser.id,
        text: 'Thank you! What specifically caught your attention?',
        timestamp: new Date(Date.now() - 43200000)
      }
    ]
    setMessages(initialMessages)
  }, [userId, currentUser.id])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      sender: currentUser.id,
      text: newMessage,
      timestamp: new Date()
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="h-full p-6">
      <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-white">
        <div className="bg-gray-50 p-4 border-b flex items-center">
          <img 
            src={otherUser.avatar} 
            alt={otherUser.name}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="font-semibold">{otherUser.name}</h3>
            <p className="text-xs text-gray-500">
              {otherUser.type === 'investor' ? 'Investor' : 'Entrepreneur'}
            </p>
          </div>
          <div className="ml-auto flex items-center">
            <span className={`w-3 h-3 rounded-full mr-2 ${otherUser.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            <span className="text-sm text-gray-500">
              {otherUser.online ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex mb-4 ${message.sender === currentUser.id ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${message.sender === currentUser.id 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border rounded-bl-none'}`}
              >
                <p>{message.text}</p>
                <p className={`text-xs mt-1 text-right ${message.sender === currentUser.id ? 'text-blue-200' : 'text-gray-500'}`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
          <div className="flex items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatPage