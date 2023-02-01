import React, {useState, useEffect} from 'react';
import { MessageBox } from "react-chat-elements";
import { Avatar} from 'antd'

function BodyChatWindow ({messages}) {
    console.log(messages)
    const user = JSON.parse(localStorage.getItem('chat-application-user'))

    return (
    <div className='body'>
        {messages.length > 0 ? 
        messages.map((item, index)=>{
            return(
                <div key={index} className={ item.sender === user.id ? 'message me': "message friend"}>
                    <div className="content">{item.message}</div>
                    <div className="content-end">
                        <span className="time_message">11:00</span>
                        {/* <span className="status">Received</span> */}
                    </div>
                </div>
            )
        })
         : ''}
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