import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import {SendOutlined} from '@ant-design/icons'

function FooterChatWindow ({handleSendMessage}) {
    const [values, setValues] = useState('')
    const handleOnchange= async(msg) =>{
      if(msg.length > 0) {
        await handleSendMessage(msg)
        setValues('');
      }
    }
    // const handleOnEnter = (msg) =>{
    //     handleSendMessage(values)
    // }
    return (
    <div className='footer'>
        <div className="file"><button>+</button></div>
        <InputEmoji
            value={values}
            onChange={setValues}
            cleanOnEnter
            onEnter={handleOnchange}
            placeholder="Type a message"
        />
        <div className="send">
            <button onClick={()=>{handleOnchange(values)}}>
                <i className="fas fa-paper-plane"></i>
            </button>
        </div>
    </div>)
}

export default FooterChatWindow;
