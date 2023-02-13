import React, {useState, useEffect, useRef} from 'react';
import {format} from 'timeago.js'
import {getMessageService} from '../../../service/axiosService'

function BodyChatWindow ({ userChat,socket}) {
    const [arrivalMessage,setArrivalMessage] = useState(null)//check if is arrival message
    const scrollRef = useRef()
    const [msg, setMsg] = useState([])
    const user = JSON.parse(localStorage.getItem('chat-application-user'))

    

    useEffect(() => {
        const isFromSelf = () => {
            if(socket.current){
                socket.current.on('message-recieve', (msg) => {
                    setArrivalMessage({fromSelf: false, message: msg})
                })
            }
        }
        isFromSelf()
    },[])
    useEffect(() => {
        const isArrivalMessage = () => {
            arrivalMessage && setMsg((prev) => [...prev, arrivalMessage]);
        }
        isArrivalMessage()
    },[arrivalMessage])

    useEffect(() => {
        const checkMsg = async () => {
            scrollRef.current?.scollIntoView({behavior: "smooth"})
            const result = await getMessageService(user._id,userChat._id)
            if(result.success){
                setMsg(result.data)
            }else{
                setMsg([])
            }
        }
        checkMsg()
    },[userChat])



    // console.log("Render chat body:")
    return (
    <div className='body'>
        <div className="body-message">
        {msg.length > 0 ? 
        msg.map((item, index)=>{
            return(
                <div key={index} className={ item.sender === user._id ? 'message me': "message friend"}>
                    <div className="content">{item.message}</div>
                    <div className="content-end">
                        <span className="time_message">{format(item.createdAt)}</span>
                        { item.sender === user._id ? <span className="status">Received</span>: ""}
                    </div>
                </div>
            )
        })
         : <div className="message friend">
            <div className="content">hello nzdkjfnasnfoi lknlkn lnln lnln lnl nlkjn khbygcygvfriend..1</div>
                <span className="time_message">11:00</span> 
        </div>
        }
        </div>
        {/* <div className="time-hook">----------------------<span>To day</span>----------------------</div>

        <div className="message me">
            <div className="content">hello friend..1</div>
            <div className="content-end">
                <span className="time_message">11:00</span>
                <span className="status">Received</span>
            </div>
        </div>
        <div className="message friend">
            <div className="content">hello nzdkjfnasnfoi lknlkn lnln lnln lnl nlkjn khbygcygvfriend..1</div>
                <span className="time_message">11:00</span> 
        </div>
        <div className="message me">
            <div className="content">Value is </div>
            <div className="content-end">
                <span className="time_message">11:00</span>
                <span className="status">Received</span>
            </div>
        </div> */}
        
    </div>)
}

export default BodyChatWindow;