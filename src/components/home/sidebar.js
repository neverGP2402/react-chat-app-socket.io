import React, {useEffect,useState} from 'react';
import { Avatar} from 'antd'
import {useNavigate} from 'react-router-dom'
import avataDefault from '../../assets/image/userDefaut.png'
import {StarOutlined,SettingOutlined, UserOutlined,LogoutOutlined} from '@ant-design/icons'
import Profile from '../profile/profile';

function Sidebar ({setMenu}) {
    const [avatar, setAvatar] = useState(avataDefault)
    const [display, setDisplay] = useState('light')
    const [selected, setSelected] = useState('chat')
    const navigate = useNavigate()
    const [profile,setProfile] = useState(false)
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

    const handleLogout= () =>{
        localStorage.clear()
        navigate('/login')
    }


    const handleProfile = () => {
        setProfile(true)
    }

    return (
    <div className='body'>
        <ul>
            <div className='avatar'>
                <Avatar src={avatar} size={50} style={{cursor: 'pointer'}} onClick={()=>{handleProfile()}}></Avatar>
                {profile ? <Profile setProfile={setProfile} user={user}/> : ''}
            </div>
            <li 
                className={ selected === 'chat' ? 'active' : ''} 
                onClick={()=>{
                    setSelected('chat')
                    setMenu('home')
                }}>
                <i className="far fa-comment"></i></li>
            <li 
                className={ selected === 'friend' ? 'active' : ''} 
                onClick={()=>{
                    setSelected('friend')
                    setMenu('friends')
                }}>
                <i className="fas fa-user-friends"></i></li>
            <li 
                className={ selected === 'star' ? 'active' : ''} 
                onClick={()=>{
                    setSelected('star')
                    setMenu('star')
                }}>
                <StarOutlined twoToneColor="#eb2f96" /></li>
            <li 
                className={ selected === '#' ? 'active' : ''} 
                onClick={()=>{
                    setSelected('#')}}>
                <i className="fas fa-comment-dots"></i></li>
            {/* <li><Logout/></li> */}
        </ul>
        <ul className='footer_Sidebar'>
            <li  onClick={()=>{handleSetDisplay()}}><i className={display === 'light' ? 'far fa-moon': 'fas fa-moon'}></i></li>
            {/* <li className='footer' onClick={()=>{handleSetDisplay()}}><i className="far fa-moon"></i></li> */}
            <li className='footer'>
                <SettingOutlined  spin={true}/>
                <div className="setting">
                    <ul>
                        <li onClick={()=>{handleProfile()}}><UserOutlined className='icon' />Infomation account </li>
                        <li onClick={()=>{handleProfile()}}><SettingOutlined className='icon' />Setting</li>
                        <li className='logout' onClick={() =>{handleLogout()}}><LogoutOutlined className='icon'/> {' '} Logout</li>
                    </ul>
                </div>
            </li>
        </ul>
               
    </div>)
}

export default Sidebar;