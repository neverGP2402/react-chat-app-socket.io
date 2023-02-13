import React, { useEffect, useState} from 'react';
import {setAvatarService} from '../service/axiosService'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import loading from '../assets/image/loading.gif'
import {Buffer} from 'buffer'
import { toast } from "react-toastify";

function SetAvatar () {
    const api = 'https://api.multiavatar.com/4645646'
    const navigate = useNavigate()
    const [avatars, setAvatars] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
    const user = JSON.parse(localStorage.getItem('chat-application-user'))
   
    const setProFilePicture = async() =>{
        if(selectedAvatar===undefined){
            return toast.error('Please select a picture')
        }
        try {
            const avatar = avatars[selectedAvatar]
            const data = await setAvatarService(user._id, {avatar})
            toast.info(data.message)
            if(!user.avatar) {
                if(data){
                    if(data.success){
                        user.avatar = data.user.avatar
                        localStorage.setItem("chat-application-user", JSON.stringify(user))
                        navigate('/')
                    }else{
                        toast.error('Please login again')
                    }
                }
            }else{
                navigate('/')
            }
        } catch (error) {
            return toast.error('Set avatar image failed')
        }
    }
     
    // check user login?
    useEffect(() => {
        function login() {
            const local = JSON.parse(localStorage.getItem('chat-application-user'))
            if(local.name|| local.avatar || local.email) {
                if(local.avatar) {
                    navigate('/')
                }
            }else{
                navigate('/login')
            }
        }
        login()
    }, [])

    useEffect(() => {
        const setAvt = async() =>{
            const data = []
            for(let i = 0; i < 5; i++){
                const image = await axios.get(
                    `${api}/${Math.round(Math.random() * 1000)}`
                )
                const buffer = new Buffer(image.data)
                data.push(buffer.toString('base64'))
            }
            setAvatars(data)
            setIsLoading(false)
        }
        setAvt()
        
    }, [])
    return (
        
        <div className="set_avatar">
        {isLoading ? <div className="">
            <img src= {loading} alt="" className="loading" />
        </div>: 
            <div className="container ">
                <div className="title">
                    <h1 style={{color: '#fff'}}>Pick an avatar as yours profile picture</h1>
                </div>
                <div className="body_set-avatar">
                    {
                        avatars.length > 0 ?
                        avatars.map((avatar, index) => {
                            return(
                                <div key={index} className={`avatar_item ${selectedAvatar === index ? 'selected' : ''}`}>
                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt=""
                                    onClick={() => setSelectedAvatar(index)}
                                     />
                                </div>
                            )
                        }) : null
                    }
                </div>
                <div className="btn align-center m-3">
                    <button className="btn btn-primary" onClick={()=>{setProFilePicture()}}>Set as Avatar</button>
                </div>
            </div>
        }
        </div>
    )
}

export default SetAvatar