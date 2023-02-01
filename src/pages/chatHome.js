import React,{useState, useEffect} from 'react';

import './homeChat.scss'
import Sidebar from '../components/home/sidebar';
import ChatList from '../components/home/ChatList';
import WellcomePage from '../components/home/chatWindow/wellcome';
import HeaderChatWindow from '../components/home/chatWindow/headerChatWIndow';
import BodyChatWindow from '../components/home/chatWindow/bodyChatWindow';
import FooterChatWindow from '../components/home/chatWindow/footerChatWindow';
import {Col, Row} from 'antd'
import {sendMessageService} from '../service/axiosService'

function ChatHome () {
    const [userChat, setUserChat] = useState([])
    const [isStarted, setIsStarted] = useState(true)
    const [message, setMessage] =useState('')
    const [messages, setMessages] = useState([])
    const handleChatChange = (user) => {
        setUserChat(user);
    };
    
    const user = JSON.parse(localStorage.getItem('chat-application-user'))

    const handleSendMessage = async (message) => {
        setMessage(message)
        const resultSendMessage = await sendMessageService({
            from: user.id,
            to: userChat._id,
            content: message
        })
        console.log('resultSendMessage', resultSendMessage)
    }

    
    return (
    <div className='home'>
        <div className="container_home">{console.warn('render')}
            {/* sidebar */}
            <Row className='sidebar'>
                <Col span={24} >
                    <Sidebar/>
                </Col>
            </Row>
            {/* chat lists */}
            <Row className='container_center' style={{width: '100%'}}>
                <Col span={24}>
                    <ChatList 
                    handleChatChange={handleChatChange} 
                    setIsStarted={setIsStarted} 
                    setMessages={setMessages}
                    />
                </Col>
            </Row>
            {/* chat container */}
            <div className="chat-window">
                {isStarted ? <WellcomePage/> :
                <>
                    <HeaderChatWindow 
                    userChat={userChat}
                    />
                    <BodyChatWindow messages={messages}/>
                    <FooterChatWindow handleSendMessage={handleSendMessage}/>
                </>
                 }
            </div>
        </div>
    </div>)
}

export default ChatHome;