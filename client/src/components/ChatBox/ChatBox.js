import React from 'react';
import { socket } from '../../App'
import Header from './Header/Header'
import ChatOnline from "./ChatOnline/ChatOnline";
import ChatContent from './ChatContent/ChatContent'
import ChatInput from "./ChatInput/ChatInput"
import './ChatBox.scss'

const ChatBox = ({ user }) => {
  const [online, setOnline] = React.useState(0)
  const [inputMessage, setInputMessage] = React.useState('')
  const [messages, setMessages] = React.useState([])

  const chatContentElement = React.useRef(null)
  const inputMessageElement = React.useRef(null)

  const sendMessage = e => {
    e.preventDefault()
    const message = e.target.value
    const date = new Date()

    setMessages(messages => ([...messages,  {message:inputMessage, username:"Utilisateur", date: ""}]))

    fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        body: JSON.stringify({message: inputMessage}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(data => data.json())
    .then(data => {
        console.log("data", data)
        setMessages(messages => ([...messages,  {message:data["message"], username:"FAQ Covid", date: ""}]))
        scrollChatToBottom(chatContentElement)
        inputMessageElement.current.focus()
        setInputMessage('')
    })
  }

  const scrollChatToBottom = (chatContentElement) => chatContentElement.current.scrollTop = chatContentElement.current.scrollHeight

  return (
    <div className="chat">
      <Header />
      <ChatOnline online={online} />
      <ChatContent chatContentElement={chatContentElement} messages={messages} />
      <ChatInput
        inputMessageElement={inputMessageElement}
        inputMessage={inputMessage}
        setInputMessage={setInputMessage}
        sendMessage={sendMessage}
      />
    </div>
  )
}

export default ChatBox