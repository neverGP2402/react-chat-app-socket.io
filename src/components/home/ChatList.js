import React, {useEffect, useState} from 'react';
import {UsergroupAddOutlined} from '@ant-design/icons'
import {useNavigate} from 'react-router-dom'
import avataDefault from '../../assets/image/userDefaut.png'
import {  ChatItem  } from "react-chat-elements"
import {toast} from 'react-toastify'
import {getAllUsersService, getMessageService} from '../../service/axiosService'
import './home.scss'

function ChatListHome ({handleChatChange,setIsStarted,setMessages}) {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const [selectedUsers, setSelectedUsers] = useState(undefined)
    const navigate = useNavigate()
    
    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('chat-application-user'))
        const checkUser = async () => {
            if(!local.email || !local.name){
                return navigate('/login')
            }
            await setCurrentUser(local)
        }
        checkUser();
    },[])

    useEffect(() => {
        const getUsers = async () => {
            // check users login?
            if(currentUser){
                // check if user is not avatar
                if(currentUser.email || currentUser.name){
                    try {
                        const data = await getAllUsersService('all')
                        if(data.success){
                            setUsers(data.user)
                            return
                        }else{
                            toast.error(data.message)
                        }
                        return
                    } catch (error) {
                        toast.error('Get list Friends failed')
                    }
                }
            }
        }
        getUsers();
    },[currentUser])

    const handleOnClickChatItem = async(index,userChat) => {
        setSelectedUsers(index)
        handleChatChange(userChat)
        setIsStarted(false)

        const result = await getMessageService(currentUser.id,userChat._id)
        
        if(result.success){
            setMessages(result.data)
        }
    }

    return (
        <>
            <div className='chatlist'>
        <div className="header">
            <div className="header_left mt-2" style={{color: '#419af9'}}><i className="far fa-comment-dots"></i></div>
            <div className="header_right">
                <div className='add'><UsergroupAddOutlined /></div> 
            </div>
        </div>
        <div className="search">
            <div className="form-group col-12 search-box">
                <input type="text" placeholder='Search...' id='search' />
                <label htmlFor="search"  className='btn-search'><i className="fas fa-search"></i></label>
           
            </div>
        </div>
        <div className="list-chat">
            <div className="container_list-chat">
            {users.map((item,index)=>{
            return(
                <div key={index}  onClick={() => {handleOnClickChatItem(index,item)}} className={`avatar_item ${selectedUsers === index ? 'selected' : ''}`}>
               
                    <ChatItem
                        avatar={item.avatar ? `data:image/svg+xml;base64,${item.avatar}`: avataDefault }
                        avatarFlexible={true}
                        alt="kursat_avatar"
                        title={item.name}
                        subtitle="What are you doing ?"
                        date={new Date()}
                        muted={true}
                        showMute={true}
                        showVideoCall={true}
                        unread={2}
                    />
                </div>
            )
        })}
            </div>
        
        </div>        
    </div>
        </>
    )
}

export default ChatListHome;