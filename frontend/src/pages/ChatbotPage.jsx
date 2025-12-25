import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './ChatbotPage.css'

const API_BASE = ''

function ChatbotPage() {
    const [messages, setMessages] = useState([
        { type: 'bot', text: 'Greetings, Commander. I am ready to analyze SAR data or answer mission queries. How can I assist?' }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const chatBoxRef = useRef(null)

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
        }
    }, [messages, isTyping])

    const sendMessage = async () => {
        if (!input.trim()) return

        const userMessage = input.trim()
        setMessages(prev => [...prev, { type: 'user', text: userMessage }])
        setInput('')
        setIsTyping(true)

        try {
            const response = await fetch(`${API_BASE}/api/chatbot`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: userMessage })
            })

            const data = await response.json()
            setMessages(prev => [...prev, { type: 'bot', text: data.response }])
        } catch (error) {
            console.error('Error:', error)
            setMessages(prev => [...prev, { type: 'bot', text: 'Connection error. Please retry.' }])
        } finally {
            setIsTyping(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    }

    return (
        <div className="chatbot-page">
            <div className="chat-container">
                <div className="chat-interface glass-card">

                    <div className="chat-header">
                        <div className="ai-avatar">
                            <i className="fa-solid fa-robot"></i>
                        </div>
                        <div className="header-info">
                            <h2>Mission Control AI</h2>
                            <p><span className="dot"></span> Online & Ready</p>
                        </div>
                    </div>

                    <div className="chat-box" ref={chatBoxRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.type}-message fade-in`}>
                                <strong>{msg.type === 'user' ? 'You:' : 'AI:'}</strong> {msg.text}
                            </div>
                        ))}

                        {isTyping && (
                            <div className="typing-indicator">
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                            </div>
                        )}
                    </div>

                    <div className="chat-input-area">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your command here..."
                            autoComplete="off"
                        />
                        <button className="send-btn" onClick={sendMessage}>
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ChatbotPage
