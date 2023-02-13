import React, {useState} from 'react'
import { Modal, Button } from 'react-bootstrap'
import Personal from './personal'
import {toast} from 'react-toastify'
import Setting from '../setting/setting'
import {updateInfoService} from '../../service/axiosService'
import './profile.scss'

function Profile({setProfile,user}) {
  const [isShow, invokeModal] = useState(true)
  const [type, setType] = useState('personal')
  const [saveUser, setSaveUser] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState({
    id: user._id,
    name: user.name ? user.name : '',
    username: user.username ? user.username : '',
    phone: user.phone ? user.phone  :'',
    birthday: user.birthday ? user.birthday : '',
    gender: user.gender ? user.gender : '',
    address: user.address ? user.address : '',
    avatar: user.avatar ? user.avatar : '',
  })
  const initModal = () => {
    invokeModal(!isShow)
    setProfile(false)
  }

  const handleUpdateProfile = async () => {
    try {
        const resultUpdate = await updateInfoService(value)
        if(resultUpdate.success) {
            toast.success(resultUpdate.message)
        }else {
            toast.error(resultUpdate.message)
        }
    }catch (err) {
        console.log(err)
    }
  }
  const handleCancleSave = () =>{
    setValue({
        name: user.name ? user.name : '',
        username: user.username ? user.username : '',
        phone: user.phone ? user.phone  :'',
        birthday: user.birthday ? user.birthday : '',
        gender: user.gender ? user.gender : '',
        address: user.address ? user.address : '',
      })
      setSaveUser(false)
  }
  const handleOnChange = (e) => {
    setValue({...value, [e.target.name]:e.target.value})
    setSaveUser(true)
  }

  return (
    <>
    <Modal 
        show={isShow} 
        onHide={initModal} 
        animation={true} 
        aria-labelledby="contained-modal-title-vcenter"
        centered
     >
        <Modal.Header closeButton>
        <Modal.Title>{type ==='personal' ? 'Profile': 'Setting'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="profile">
            <div className="container-profile">
                <div className="btn">
                    <button className={type === 'personal' ? 'active': ''} onClick={()=>{setType('personal')}}>Personal</button>
                    <button className={type === 'setting' ? 'active': ''} onClick={()=>{setType('setting')}}>Setting</button>
                </div>
                {type === 'personal' ? 
                <Personal 
                     user={user}
                    handleOnChange={handleOnChange}
                    value={value}
                    setValue={setValue}
                    setSaveUser={setSaveUser}
                /> : <Setting/>}
            </div>
        </div>
        </Modal.Body>        
        <Modal.Footer>
            {type === 'personal' && saveUser ? 
            <>
                <Button  variant="success" onClick={()=>{handleUpdateProfile()}}>Save</Button>
                <Button  variant="warning" onClick={()=>{handleCancleSave()}}>cancel</Button>
            </>
             : ''}
            <Button  variant="danger" onClick={()=>{initModal()}}>
                Close
            </Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}
export default Profile