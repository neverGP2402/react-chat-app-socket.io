import React, {useEffect, useState} from 'react';
import avataDefault from '../../../assets/image/userDefaut.png'
import {  ChatItem  } from "react-chat-elements"

export default function ListFriend ({currentUser,selectedUsers,handleOnClickChatItem,isOnline}){
    
    return (
        
        <>
            <div className="count-friend" style={{padding: '0 20px', fontSize: '18px'}}>Friends: {currentUser.length}</div>
                <div className="container_list-chat">
                    {currentUser.map((item,index)=>{
                    return(
                        
                        <div key={index}  onClick={() => {handleOnClickChatItem(index,item)}} className={`avatar_item ${selectedUsers === index ? 'selected' : ''}`}>
                            
                            {isOnline(item._id) ? <div className="online">.</div> :''}
                            <ChatItem
                                avatar={item.avatar ? `data:image/svg+xml;base64,${item.avatar}`: avataDefault }
                                avatarFlexible={true}
                                title={item.name}
                                // subtitle="What are you doing ?"
                                // date={new Date()}
                                // muted={true}
                                // showMute={true}
                                // showVideoCall={true}
                                // unread={2}
                            />
                        </div>
                    )
                })}
            </div>
        </>
    )

}