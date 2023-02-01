import React, {useEffect,useState} from 'react';
import { Avatar} from 'antd'
import {useNavigate} from 'react-router-dom'
import avataDefault from '../../assets/image/userDefaut.png'
import {StarOutlined,SettingOutlined} from '@ant-design/icons'
import Logout from './logout';

function Sidebar () {
    const [avatar, setAvatar] = useState(avataDefault)
    const [display, setDisplay] = useState('light')
    const [selected, setSelected] = useState('chat')
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
    },[avatar])
    const handleSetDisplay = () => {
        if(display === 'light'){
            setDisplay('dark')
        }else{
            setDisplay('light')
        }
    }
    return (
    <div className='body'>
        <ul>
            <div className='avatar'><Avatar src={avatar} size={50} style={{cursor: 'pointer'}}>A</Avatar></div>
            <li className={ selected === 'chat' ? 'active' : ''} onClick={()=>{setSelected('chat')}}><i className="far fa-comment"></i></li>
            <li className={ selected === 'friend' ? 'active' : ''} onClick={()=>{setSelected('friend')}}><i className="fas fa-user-friends"></i></li>
            <li className={ selected === 'star' ? 'active' : ''} onClick={()=>{setSelected('star')}}><StarOutlined twoToneColor="#eb2f96" /></li>
            <li className={ selected === '#' ? 'active' : ''} onClick={()=>{setSelected('#')}}><i className="fas fa-comment-dots"></i></li>
            <li><Logout/></li>
        </ul>
        <ul className='footer_Sidebar'>
            <li className='footer' onClick={()=>{handleSetDisplay()}}><i className={display === 'light' ? 'far fa-moon': 'fas fa-moon'}></i></li>
            {/* <li className='footer' onClick={()=>{handleSetDisplay()}}><i className="far fa-moon"></i></li> */}
            <li className='footer'><SettingOutlined  spin={true}/></li>
        </ul>
               
    </div>)
}

export default Sidebar;