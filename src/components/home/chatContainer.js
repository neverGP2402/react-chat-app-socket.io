import React,{useState} from 'react';
import HeaderChatWindow from './chatWindow/headerChatWIndow';
import BodyChatWindow from './chatWindow/bodyChatWindow';
import FooterChatWindow from './chatWindow/footerChatWindow';

function ChatContainer ({userChat}){
    return(
        <>
            <HeaderChatWindow userChat={userChat}/>
            <BodyChatWindow/>
            <FooterChatWindow/>
        </>
    )
}

export default ChatContainer;