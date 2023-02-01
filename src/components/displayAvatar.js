import React, {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import {Avatar} from 'antd'

import avataDefault from '../assets/image/userDefaut.png'

function DisPlayAvatar () {
    const [avatar, setAvatar] = useState(avataDefault)
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('chat-application-user'))

    useEffect(()=>{
        const getAvatar = () => {
            if(user){
                if(user.avatar){
                    setAvatar(`data:image/svg+xml;base64,${user.avatar}`)
                }
            }else{
                navigate('/login')
            }
        }
        getAvatar();
    })
    return (
        <Avatar src={avatar}></Avatar>
    )
}

export default DisPlayAvatar