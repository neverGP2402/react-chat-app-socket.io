import React, {useEffect,useState} from 'react';
import { Avatar} from 'antd'
import {useNavigate} from 'react-router-dom'
import avataDefault from '../../../assets/image/userDefaut.png'

function HeaderChatWindow ({userChat}) {
    const [user,setUser] = useState({
        online: false,
    })

    return (
        <div className='header'>
            <div className="header-left">
                <div className="avt">
                    <Avatar src={userChat.avatar ? `data:image/svg+xml;base64,${userChat.avatar}`: avataDefault} size={50}></Avatar>
                </div>
                <div className="info m-lg-3">
                    <div className="name">{userChat.name}</div>
                    <div className="status online">{user.online ? 'Online' : 'Offline'}</div>
                </div>
            </div>
            <div className="header-right">
                <div className="button">
                    <button style={{color:'#0abb87'}}><i className="fas fa-phone-volume"></i></button>
                </div>
                <div className="button">
                    <button style={{color:'#ffb822'}}><i className="fas fa-video"></i></button>
                </div><div className="button">
                    <button style={{color:'#0abb87'}}><i className="fas fa-list-ul"></i></button>
                </div>
            </div>
        </div>
    )
}

export default HeaderChatWindow;