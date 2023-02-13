import React, {useState, useEffect, useRef} from 'react';
import HeaderChatWindow from './chatWindow/headerChatWIndow';
import FooterChatWindow from './chatWindow/footerChatWindow';
import {format} from 'timeago.js'
import { v4 as uuidv4 } from "uuid";
import {getMessageService,sendMessageService} from '../../service/axiosService'


function ChatContainer ({userChat, receivedMessage,setNewMessage,userOnline}){
    const scrollRef = useRef()
    const [msg, setMsg] = useState([])
    const user = JSON.parse(localStorage.getItem('chat-application-user'))
    
    
    useEffect(() => {
        const checkMsg = async () => {
            const result = await getMessageService(user._id,userChat._id)
            if(result.success){
                setMsg(result.data)
            }else{
                setMsg([])
            }
        }
        checkMsg()
    },[userChat])
   

    
    const handleSendMessage = async (message) => {
        const resultSendMessage = await sendMessageService({
            from: user._id,
            to: userChat._id,
            content: message
            })

        const newMessage = {
            sender: user._id,
            to: userChat._id,
            message: message,
            receiverId: userChat._id,
            createdAt: new Date(),
        }
        setNewMessage(newMessage)
    }

    // if received message => setMsg 
    useEffect(() =>{
        if(receivedMessage){
            setMsg([...msg, receivedMessage])
        }
     },[receivedMessage])


    // when msg is received
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [msg]);


    return(
        <>
            <HeaderChatWindow userChat={userChat} userOnline={userOnline}/>
            <div className='body'>
                <div className="body-message">
                {msg.length > 0 ? 
                msg.map((item)=>{
                    return(
                        <div key={uuidv4()} ref={scrollRef} className={ item.sender === user._id ? 'message me': "message friend"} >
                            <div className="content">{item.message}</div>
                            <div className="content-end">
                                <span className="time_message">{format(item.createdAt)}</span>
                                { item.sender === user._id ? <span className="status"><i  className="fas fa-check"></i></span>: ""}
                                {/* { item.sender === user._id ? 'message me': "message friend"} */}
                            </div>
                        </div>
                    )
                })
                : <div className="message friend">
                    <div className="content">Không có tin nhắn..!</div>
                    <span className="time_message">Now</span> 
                </div>
                }
                </div> 
            </div>
            <FooterChatWindow
                handleSendMessage={handleSendMessage}
            />
        </>
    )
}

export default ChatContainer;