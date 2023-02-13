import React, {useEffect} from "react";
import { Form } from 'react-bootstrap'
import {UserAddOutlined} from '@ant-design/icons'
import {toast} from 'react-toastify'
import avataDefault from '../../assets/image/userDefaut.png'
import {sendRequestService} from '../../service/axiosService'
import { Avatar } from 'antd'


export default function AddFriend({setValue,userFriend,icon,setIcon, user,socket,setIsAddFriend}){
    
    const handleOnChange = (e) => {
        setValue(e.target.value)
    }
    

    const handleAgreeAddFriend = async () => {
        try{
            const result = await sendRequestService({userSendRequest:user.id, userReceived: userFriend._id})
            console.log(result)
            if(result.success){
                toast.success(result.message)
                const data = {
                    ...user,
                    idReceived: userFriend._id
                }
                socket.current.emit('send-request-add-friend', data)
                setIcon(true)
                setIsAddFriend(true)
            }else{
                toast.error(result.message)
            }
        }catch(err){
            console.log(err)
            toast.error('Send request add friend failed')
        }
    }

    return(
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email or username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="email or username"
                // value={value}
                onChange={(e) => handleOnChange(e)}
              />
            </Form.Group>
            {userFriend.name ? <div className="user">
                <div className="left">
                    <div className="avatar">
                        <Avatar size={50} src={ userFriend.avatar ? `data:image/svg+xml;base64,${userFriend.avatar}`: avataDefault}></Avatar>
                    </div>
                    <div className="info">
                        <div className="name">
                            {userFriend.name}
                        </div>
                        <div className="gender">Sex: {userFriend.gender ? userFriend.gender : <i className="fas fa-eye-slash"></i>}</div>
                    </div>
                </div>
                <div className="right" >
                    {!icon ? <UserAddOutlined className='add' onClick={()=>{handleAgreeAddFriend()}}/> : <i style={{color: '#3ab54a'}} className="fas fa-check-circle"></i>}
                </div>
            </div> : ''}
          </Form>
    )
}