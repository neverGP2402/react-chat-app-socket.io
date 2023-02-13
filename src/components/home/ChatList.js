import React, {useEffect, useState} from 'react';
import {UsergroupAddOutlined} from '@ant-design/icons'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {getUsersChatService, getFollowersService, getAllFriendService} from '../../service/axiosService'
import AddFriendModal from '../modal/friend'
import './home.scss'
import ListChat from './chatList/listChat';
import ListFriend from './chatList/listFriend';

function ChatListHome ({handleChatChange,setIsStarted, userOnline,socket, menu}) {
    const [request, setRequest] = useState([])
    const [isAddFriend, setIsAddFriend] = useState(false)
    const [users, setUsers] = useState(undefined)
    const [currentUser, setCurrentUser] = useState([])
    const [listFriends, setListFriends] = useState([])
    const [selectedUsers, setSelectedUsers] = useState(undefined)
    const [modalAddUser, setModalAddUser] = useState(false)

    const navigate = useNavigate()
    const local = JSON.parse(localStorage.getItem('chat-application-user'))


    const isOnline = (id) => {
        const user = userOnline.find(user => user.userId === id)
        return user ? true : false
    }

    // console.log('render')
    useEffect(() => {
        console.log('is add friends')
        if(isAddFriend){
            setIsAddFriend(false)
          socket.current.on("recieve-send-request-add-friend", (data)=>{
            console.log('socket is online')
              setIsAddFriend(false)
          }) 
        }
      
    },[isAddFriend])

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
                        const data = await getUsersChatService(local._id)
                        console.log(data)
                        if(data.success){
                            setCurrentUser(data.user)
                            return
                        }else{
                            toast.error(data.message)
                        }
                        return
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        }
        getUsers();
    },[users])

    useEffect(() => {
        const getListFriends =async () =>{
            try{
                const friends =  await getAllFriendService(local._id)
                if(friends.success){
                    setListFriends(friends.user)
                }
            }catch (err){
                console.log(err)
            }
        }
        getListFriends();
    },[request])

    useEffect(() => {
        const getFollowers = async () => {
            try{
                const followers = await getFollowersService(local._id)
                if(followers.success){
                    setRequest(followers.user)
                }
            }catch(error){
                console.log(error)
                toast.error('Get followers failed')
            }
        }
        getFollowers()
    },[])

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
                    {request.length > 0 ? <span className='new'>N</span> : ''}
                </div> 
                {modalAddUser ? <AddFriendModal request={request} 
                        setModalAddUser={setModalAddUser}
                        isAddFriend={isAddFriend}
                        setIsAddFriend={setIsAddFriend}
                        socket={socket}
                    /> : ''}
            </div>
        </div>
        <div className="search">
            <div className="form-group col-12 search-box">
                <input type="text" placeholder='Search...' id='search' />
                <label htmlFor="search"  className='btn-search'><i className="fas fa-search"></i></label>
           
            </div>
        </div>
        <div className="list-chat">
            {menu === 'home' && <ListChat
                currentUser={currentUser}
                selectedUsers={selectedUsers}
                handleOnClickChatItem={handleOnClickChatItem}
                isOnline={isOnline}
            />}
            {
                menu === 'friends' && 
                <ListFriend
                currentUser={listFriends}
                selectedUsers={selectedUsers}
                handleOnClickChatItem={handleOnClickChatItem}
                isOnline={isOnline}
            />
            }
        </div>        
    </div>
        </>
    )
}

export default ChatListHome;