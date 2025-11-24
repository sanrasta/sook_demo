import { useState, useEffect, useRef } from 'react'
import { ChatMessage } from '../types'

/**
 * ChatPanel component with local state management
 * Seeds with fake messages on mount for demo purposes
 */
function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Seed chat with fake messages when component mounts
  useEffect(() => {
    const seedMessages: ChatMessage[] = [
      {
        id: '1',
        username: 'Sarah',
        message: 'This show is amazing! 🎉',
        timestamp: new Date(Date.now() - 300000),
      },
      {
        id: '2',
        username: 'Mike',
        message: 'Love the products!',
        timestamp: new Date(Date.now() - 240000),
      },
      {
        id: '3',
        username: 'Emma',
        message: 'How long is the discount available?',
        timestamp: new Date(Date.now() - 180000),
      },
      {
        id: '4',
        username: 'Host',
        message: 'Welcome everyone! Thanks for joining!',
        timestamp: new Date(Date.now() - 120000),
      },
    ]
    setMessages(seedMessages)
  }, [])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      username: 'You',
      message: inputValue,
      timestamp: new Date(),
    }

    // Use functional update pattern to avoid stale state
    setMessages((currentMessages) => [...currentMessages, newMessage])
    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden shadow-2xl border border-purple-500/20">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 backdrop-blur-sm px-4 py-3 border-b border-purple-500/20">
        <div className="flex items-center justify-between">
          <h2 className="text-white font-bold text-lg">Live Chat</h2>
          <div className="flex items-center gap-2 text-xs text-purple-200">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>{messages.length} messages</span>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-slate-800">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col animate-fadeIn">
            <div className="flex items-baseline gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-bold text-sm">
                {msg.username}
              </span>
              <span className="text-slate-500 text-xs">
                {msg.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
            <p className="text-slate-200 text-sm mt-1 leading-relaxed">{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 border-t border-purple-500/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-slate-700/50 text-white px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-400 border border-purple-500/20"
          />
          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-bold transition-all duration-200 shadow-lg hover:shadow-purple-500/50 hover:scale-105 transform"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChatPanel

