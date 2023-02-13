import React,{useState, useEffect,useRef} from 'react';
import {io} from 'socket.io-client'
import { useNavigate } from 'react-router-dom';
import './homeChat.scss'
import Sidebar from '../components/home/sidebar';
import ChatList from '../components/home/ChatList';
import ChatContainer from '../components/home/chatContainer';
import WellcomePage from '../components/home/chatWindow/wellcome';
import {Col, Row} from 'antd'

function ChatHome () {
    const [userChat, setUserChat] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [userOnline, setUserOnline] = useState([])
    const [receivedMessage, setReceivedMessage] = useState('')
    const [isStarted, setIsStarted] = useState(true)
    const [menu, setMenu] = useState('home')

    const user = JSON.parse(localStorage.getItem('chat-application-user'))
    const navigate = useNavigate()
    console.log('render')
    const socket = useRef()

    useEffect(() => {
        const checkUser = async () => {
            if(!user?._id || !user?.name){
                return navigate('/login')
            }
        }
        checkUser();
    },[])

    useEffect(() => {
        const addUserSocket = () =>{
            if(user?._id){
                socket.current = io('http://localhost:8000')
                socket.current.emit('add-user-socket', user._id )
                socket.current.on('get-user-socket', (users)=>{
                    setUserOnline(users)
                })
            }
        }
        addUserSocket()
    },[])

    useEffect(() =>{
        if(newMessage){
            socket.current.emit('send-message-user', newMessage)
            setReceivedMessage(newMessage)
        }
    },[newMessage])
    useEffect(() => {
        const getUserSocket = () => {
            socket.current.on('get-user-socket', (usersOnline) => {
                setUserOnline(usersOnline)
            })
            socket.current.on('recieve-new-message', (data) => {
                setReceivedMessage(data)
            })
        }
        if(socket.current)getUserSocket()
    },[newMessage])

    
    useEffect(() =>{
        if(socket.current){
            socket.current.on('get-user-socket', (usersOnline) => {
                setUserOnline(usersOnline)
            })
            socket.current.on('recieve-new-message', (data) => {
                setReceivedMessage(data)
            })
        }
    },[newMessage])


    const handleChatChange = (user) => {
        setUserChat(user);
    };


    
    return (
    <div className='home'>
        <div className="container_home">
        {/* {console.warn('render')} */}
            {/* sidebar */}
            <Row className='sidebar'>
                <Col span={24} >
                    <Sidebar setMenu={setMenu}/>
                </Col>
            </Row>
            {/* chat lists */}
            <Row className='container_center' style={{width: '100%'}}>
                <Col span={24}>
                    <ChatList 
                    handleChatChange={handleChatChange} 
                    setIsStarted={setIsStarted} 
                    userOnline={userOnline}
                    socket={socket}
                    menu={menu}
                    />
                </Col>
            </Row>
            {/* chat container */}
            <div className="chat-window">
                {isStarted ? <WellcomePage/> :
                <>
                    <ChatContainer 
                        userChat={userChat}
                        userOnline={userOnline}
                        socket={socket}
                        receivedMessage={receivedMessage}
                        setNewMessage={setNewMessage}
                    />
                </>
                 }
            </div>
        </div>
    </div>)
}

export default ChatHome;