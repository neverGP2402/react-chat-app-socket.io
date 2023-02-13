import React, {useState, useEffect} from 'react'
import avataDefault from '../../assets/image/userDefaut.png'
import { Avatar } from 'antd'
import { toast } from 'react-toastify';
import DatePicker from 'react-date-picker';
import getBase64 from '../../utils/convertImageToBase64'
import {getFollowingService, getAllFriendService, getFollowersService} from '../../service/axiosService'

function Personal ({ user, handleOnChange, value, setValue,setSaveUser}){
    const [edit, setEdit] = useState(false)
    const [birthday, setBirthday] = useState('')
    const [following, setFollowing] = useState([])
    const [request, setRequest] = useState([])
    const [listFriends, setListFriends] = useState([])

    const handleEditAvatar = async(e) =>{
        setSaveUser(true)
        const data = e.target.files
        const file = data[0]
        try{
            const base64 = await getBase64(file)
            const avt = base64.toString('base64')
            setValue({...value, avatar: avt})
        }catch(e){
            console.log(e)
            toast.error('e')
        }

    }

    useEffect(()=>{
        const getFollowing = async()=>{
           try{
            const following = await getFollowingService(user._id)
            if(following && following.success){
                setFollowing(following.user)

            }else{
                toast.error(following.message)
            }
           }catch(e){
            console.log(e)
            toast.error('Get followings failed')
           }
        }
        getFollowing()
    },[])

    useEffect(() => {
        const getListFriends =async () =>{
            try{
                const friends =  await getAllFriendService(user._id)
                if(friends.success){
                    setListFriends(friends.user)
                }
            }catch (err){
                console.log(err)
            }
        }
        getListFriends();
    },[])

    useEffect(() => {
        const getFollowers = async () => {
            try{
                const followers = await getFollowersService(user._id)
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

    return (
        
        // 
        <div className="content mt-5">
                <div className="group">
                    <div className="avatar">
                    <Avatar size={90} src={value.avatar ? `data:image/svg+xml;base64,${value.avatar}` : avataDefault}></Avatar>
                    <div className="edit-avt">
                        <label htmlFor="upload_avt" className='upload-avt' 
                            onClick={()=>{setEdit(true)}}
                        >
                            <i className="fas fa-images"></i>
                        </label>
                        <input type="file" 
                            onChange={(e)=>{handleEditAvatar(e)}} 
                            id='upload_avt'style={{display: 'none'}} />
                    </div>
                    </div>
                    <div className="info">
                    <div className="name form-group col-12">
                        <input 
                            type="text" 
                            id='name' 
                            title='Name' 
                            className='full-name'
                            name='name'
                            value={value.name}
                            readOnly={edit ? false : true}
                            onChange={(e)=>{handleOnChange(e)}}
                            onBlur={()=>{setEdit(false)}}
                        />
                        <label htmlFor="name" onClick={()=>{setEdit(true)}}><i className="fas fa-user-edit"></i></label>
                    </div>
                    <div className="name form-group mb-2">
                        <input 
                            type="text" id='username' 
                            title='Username' 
                            disabled={ true}
                            onBlur={()=>{setEdit(false)}}
                            // defaultValue={user.username ? user.username : ''}
                            value={value.username}
                            placeholder='No username'
                        />
                        {/* <label htmlFor="username" onClick={()=>{setEdit(true)}}><i className="fas fa-user-edit"></i></label> */}
                    </div>
                    <div className="friend-follow">
                        <div className="friend group">
                        <div className="title mb-2">Friend</div>
                        <span>{listFriends.length}</span>
                        </div>
                        <div className="friend group">
                        <div className="title mb-2">Following</div>
                        <span>{following.length}</span>
                        </div>
                        <div className="friend group">
                        <div className="title mb-2">Follower</div>
                        <span>{request.length}</span>
                        </div>
                    </div>
                    </div>
                </div>
                {/* email */}
                <div className="form-group">
                    <label htmlFor=""><b><i className="far fa-envelope"></i> Email:</b></label>
                    <div className="input">
                    <input 
                    type="email" 
                    value={user.email}
                    readOnly={true}
                    disabled
                    id='email'/>
                    {/* <label htmlFor="email" onClick={()=>{setEdit(true)}}><i className="fas fa-user-edit"></i></label> */}
                    </div>
                </div>
                {/* phone */}
                <div className="form-group">
                    <label htmlFor=""><b><i className="fas fa-mobile-alt"></i> Phone:</b></label>
                    <div className="input">
                        <input 
                            type="text" 
                            // defaultValue={user.phone ? user.phone : ''}
                            placeholder=" No phone number"
                            readOnly={edit ? false : true}
                            onBlur={()=>{setEdit(false)}}
                            onChange={(e)=>{handleOnChange(e)}}
                            value={value.phone}
                            id='Phone'
                            name='phone'
                        />
                        <label htmlFor="Phone" onClick={()=>{setEdit(true)}}><i className="fas fa-user-edit"></i></label>
                    </div>
                </div>
                <div className="info-left">
                    <div className="form-group phone">
                        <label htmlFor=""><b><i className="fas fa-calendar-day"></i> Birthday:</b></label>
                        <div className="input">
                            <DatePicker 
                                id='birthday' 
                                disabled={edit ? false : true}
                                onBlur={()=>{
                                    setEdit(false)
                                    setValue({...value, birthday: birthday})
                                }}
                                onChange={setBirthday}
                                className="date"
                                value={new Date(value.birthday)}
                            />
                            <label htmlFor="birthday" onClick={()=>{setEdit(true)}}><i className="fas fa-user-edit"></i></label>
                        </div>
                    </div>
                    <div className="form-group bottom">
                        <label ><b>Sex:</b></label>
                        <label 
                            htmlFor="gender"   
                            className='gender' 
                            onClick={()=>{setEdit(true)}}
                        >
                            <i className="fas fa-user-edit"></i>
                        </label>
                        
                        <select name="gender" id="gender" 
                            disabled={edit ? false : true} 
                            // defaultValue={user.gender ? user.gender : 'No gender'} 
                            onBlur={()=>{setEdit(false)}}
                            onChange={(e)=>{handleOnChange(e)}}
                            value={value.gender}
                        >
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="other">other</option>
                        </select>
                    </div>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor=""><b><i className="fas fa-map-marker-alt"></i> Address:</b></label>
                    <div className="input">
                        <input 
                            type="email" 
                            // defaultValue={user.address ? user.address : ''} 
                            placeholder="No address"
                            readOnly={edit ? false : true}
                            onBlur={()=>{setEdit(false)}}
                            onChange={(e)=>{handleOnChange(e)}}
                            id='address'
                            name='address'
                            value={value.address}
                        />
                        <label htmlFor="address" onClick={()=>{setEdit(true)}}><i className="fas fa-user-edit"></i></label>
                    </div>
                </div>
                <div className="social">
                    <div className="social-title"><i className="fas fa-share-alt"></i><b> Social media accounts:</b></div>
                    <ul>
                    <li>
                        <a href="" target='_blank'>                     
                        <i style={{color: '#0676e8', fontSize: '18px'}} className="fab fa-facebook-square"></i> Facebook
                        </a>
                    </li>
                    <li>
                        <a href="" target='_blank'>
                        <i style={{color: '#ff0000'}} className="fab fa-youtube"></i> Youtube
                        </a>
                    </li>
                    <li>
                        <a href="" target='_blank'>
                        <i style={{color: '#4285f4'}} className="fab fa-google"></i> Google
                        </a>                      
                        </li>
                    </ul>
                </div>
                </div>
    )
}

export default Personal