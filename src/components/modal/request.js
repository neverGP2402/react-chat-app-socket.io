import React from "react";
import avataDefault from '../../assets/image/userDefaut.png'
import noResult from '../../assets/image/no-result.jpg'
import {toast} from 'react-toastify'
import { Avatar } from 'antd'
import {agreeAddFriendService,deleteRequestService} from '../../service/axiosService'

export default function Request({request,user}){

    const handleAgreeAddFriend = async(idUserRequest) => {
        try{
            const result = await agreeAddFriendService({idSenderRequest: idUserRequest, idReceivedRequest: user._id})
            console.log(result)
            if(result){
                if(result.success){
                    console.log(result.message)
                    toast.success(result.message)
                }else{
                    toast.error(result.message)
                }
            }else{
                toast.error('Add friend failed')
            }
        }catch(err){
            console.log(err)
            toast.error('Add friend failed')
        }
    }
    const handleDeleteRequest = async(idUserRequest) => {
        try {
            const result = await deleteRequestService({idSender: idUserRequest, idReceived: user._id})
          
            if(result){
                if(result.success){
                    toast.success(result.message)
                }else{
                    toast.error(result.message)
                }
            }else{
                toast.error('Delete friend failed')
            }
        }catch(err){
            console.log(err)
            toast.error('Delete friend failed')
        }
    }

    return(
        <div className="request">
            <div className="title">Request: {request.length}</div>
            {request && request.map((item,index)=>{
                return(
                    <div className="list-request" key={index}>
                    <div className="item-request">
                        <div className="left">
                            <div className="avatar"><Avatar size={45} src={item.avatar ? `data:image/svg+xml;base64,${item.avatar}` : avataDefault}/></div>
                            <div className="info">
                                <div className="name">{item.name}</div>
                                <span>Sex: {item.gender ? item.gender : <i className="fas fa-eye-slash"></i>}</span>
                            </div>
                        </div>
                        <div className="right">
                            <button onClick={()=>{handleDeleteRequest(item._id)}}>
                                <i style={{color: '#dc4c64'}} className="fas fa-times"></i>
                            </button>
                            <button onClick={()=>{handleAgreeAddFriend(item._id)}}>
                                <i style={{color: '#3ab54a'}} className="fas fa-check-circle"></i>
                            </button>
                        </div>
                    </div>
                </div>
                )
            })}
            {
                request.length === 0 && <div className="no-friend">
                <img src={noResult} alt="" />
                <div><i>Not required...! </i></div>
            </div> 
            }
            {/* <div className="no-friend">
                <img src={noResult} alt="" />
                <div><i>Not required...! </i></div>
            </div> */}
        </div>
    )
}