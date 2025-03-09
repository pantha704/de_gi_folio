'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircleIcon, SendIcon, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// This component renders an always-visible chatbot widget in the corner of the screen
export default function ChatbotWidget() {
  // State for managing open/closed state of the chatbot
  const [isOpen, setIsOpen] = useState(false)

  // State for managing chat messages
  const [messages, setMessages] = useState<
    { text: string; sender: 'user' | 'bot' }[]
  >([
    {
      text: "Hi there! I'm your DeGi assistant. I can help analyze your skills and find opportunities. Start by submitting your profiles!",
      sender: 'bot',
    },
  ])

  // State for the current message being typed
  const [currentMessage, setCurrentMessage] = useState('')

  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Function to handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!currentMessage.trim() || isLoading) return

    // Add user message to the chat
    const userMessage = { text: currentMessage, sender: 'user' as const }
    setMessages([...messages, userMessage])

    // Clear input field
    const messageToBeSent = currentMessage
    setCurrentMessage('')

    // Set loading state
    setIsLoading(true)

    try {
      // Send the message to the chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToBeSent,
          // You could include context like conversation history or user data
          context: {
            // previousMessages: messages.map(m => ({ text: m.text, sender: m.sender })),
            // Add any other context needed by the AI
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from chat API')
      }

      const data = await response.json()

      // Add bot response to the chat
      setMessages((prev) => [
        ...prev,
        {
          text: data.reply,
          sender: 'bot',
        },
      ])
    } catch (error) {
      console.error('Error sending message:', error)

      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, I'm having trouble responding right now. Please try again later.",
          sender: 'bot',
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Minimized chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg bg-gradient-to-r 
            from-[--primary] to-[--accent] hover:shadow-xl 
            hover:from-[--primary]/90 hover:to-[--accent]/90 text-white 
            flex items-center justify-center"
        >
          <MessageCircleIcon className="w-6 h-6" />
          <span className="sr-only">Open chat</span>
        </button>
      )}

      {/* Expanded chat widget */}
      {isOpen && (
        <div
          className="w-80 sm:w-96 flex flex-col overflow-hidden 
          bg-[--card] rounded-xl border shadow-xl"
        >
          {/* Chat header */}
          <div
            className="p-4 bg-gradient-to-r from-[--primary] to-[--accent] 
            text-white flex justify-between items-center"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full bg-white/20 
                flex items-center justify-center"
              >
                <MessageCircleIcon className="w-5 h-5" />
              </div>
              <h3 className="font-medium">DeGi Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center 
                text-white/80 hover:text-white hover:bg-white/20"
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-96 bg-[--card]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  'flex',
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.sender === 'bot' && (
                  <div
                    className="w-8 h-8 rounded-full bg-[--accent]/10 
                    flex items-center justify-center mr-2 mt-1"
                  >
                    <MessageCircleIcon className="w-4 h-4 text-[--accent]" />
                  </div>
                )}
                <div
                  className={cn(
                    'max-w-[80%] px-4 py-3 rounded-xl',
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-[--primary] to-[--accent] text-white rounded-br-none'
                      : 'bg-[--secondary] text-[--foreground] rounded-tl-none'
                  )}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="border-t border-[--border] p-3">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-3 py-2 border border-[--border] 
                  bg-[--background] text-[--foreground] rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-[--primary]"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-10 h-10 rounded-md bg-[--primary] text-white 
                  flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                ) : (
                  <SendIcon className="h-4 w-4" />
                )}
                <span className="sr-only">Send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
