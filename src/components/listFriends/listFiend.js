import React, {useEffect, useState, useRef} from 'react';
import {UsergroupAddOutlined} from '@ant-design/icons'
import {useNavigate} from 'react-router-dom'
import avataDefault from '../../assets/image/userDefaut.png'
import {  ChatItem  } from "react-chat-elements"
import {toast} from 'react-toastify'
import {getAllFriendService} from '../../service/axiosService'
import AddFriendModal from '../modal/friend'
import './listFriend.scss'

function ChatListHome ({handleChatChange,setIsStarted, userOnline}) {
    const [users, setUsers] = useState(undefined)
    const [friends, setFriends] = useState([])
    const [selectedUsers, setSelectedUsers] = useState(undefined)
    const [modalAddUser, setModalAddUser] = useState(false)

    const navigate = useNavigate()
    const local = JSON.parse(localStorage.getItem('chat-application-user'))
    
    const isOnline = (id) => {
        const user = userOnline.find(user => user.userId === id)
        return user ? true : false
    }

    useEffect(() => {
        const checkUser = async () => {
            if(!local?.email || !local?.name){
                return navigate('/login')
            }
            await setUsers(local)
        }
        checkUser();
    },[])
    
    useEffect(() => {
        const getUsers = async () => {
            // check users login?
            if(users){
                // check if user is not avatar
                if(users.email || users.name){
                    try {
                        const data = await getAllFriendService(local.id)
                        if(data.success){
                            setFriends(data.user)
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
    },[users])

    const handleOnClickChatItem = async(index,userChat) => {
        setSelectedUsers(index)
        handleChatChange(userChat)
        setIsStarted(false)
    }


    return (
        <>
        <div className='chatlist'>
        <div className="header">
            <div className="header_left mt-2" style={{color: '#419af9'}}><i className="far fa-comment-dots"></i></div>
            <div className="header_right">
                <div className='add' onClick={()=>setModalAddUser(!modalAddUser)}>
                    <UsergroupAddOutlined />
                </div> 
                {modalAddUser ? <AddFriendModal 
                        setModalAddUser={setModalAddUser}
                    /> : ''}
            </div>
        </div>
        <div className="search">
            <div className="form-group col-12 search-box">
                <input type="text" placeholder='Search...' id='search' />
                <label htmlFor="search"  className='btn-search'><i className="fas fa-search"></i></label>
           
            </div>
        </div>
        <div className="request_add-friend">
            <div className="icon">Icon</div>
            <div className="description">List add friend</div>
        </div>
        <div className="list-chat">
            <div className="container_list-chat">
            {friends.map((item,index)=>{
            return(
                
                <div key={index}  onClick={() => {handleOnClickChatItem(index,item)}} className={`avatar_item ${selectedUsers === index ? 'selected' : ''}`}>
                    
                    {isOnline(item._id) ? <div className="online">.</div> :''}
                    <ChatItem
                        avatar={item.avatar ? `data:image/svg+xml;base64,${item.avatar}`: avataDefault }
                        avatarFlexible={true}
                        alt="kursat_avatar"
                        title={item.name}
                        subtitle="What are you doing ?"
                        date={new Date()}
                        // muted={true}
                        // showMute={true}
                        // showVideoCall={true}
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