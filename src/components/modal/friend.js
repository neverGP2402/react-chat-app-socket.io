import React, {useState, useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap'
import AddFriend from './addFriend'
import Request from './request'
import {toast} from 'react-toastify'
import {findUsersService} from '../../service/axiosService'
import './modal.scss'

function ModalDialog({setModalAddUser,request, socket, setIsAddFriend}) {
  const [isShow, invokeModal] = useState(true)
  const [userFriend, setUserFriend] = useState([])
  const [value, setValue] = useState('')
  const [type, setType] = useState('Add friend')
  const [icon, setIcon] =useState(false)
  const user = JSON.parse(localStorage.getItem('chat-application-user'))
  // useEffect(() => {

  // },[userFriend])
  const initModal = () => {
    invokeModal(!isShow)
    setModalAddUser(false)
  }


  const handleFindUser = async() => {
    setUserFriend([])
    setIcon(false)
    if(value){
      const result = await findUsersService({data: value})
      if(result.success){
        setUserFriend(result.user)
      }else{
        toast.warn(result.message)
      }
    }else{
      toast.info('Not found')
    }
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
        <Modal.Title>{type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="option mb-4">
              <div className="btn">
                  <button className={type === 'Add friend' ? 'active': ''} onClick={()=>{setType('Add friend')}}>Add Friend</button>
                  <button className={type === 'Request add friend' ? 'active': ''} onClick={()=>{setType('Request add friend')}}>
                    Request Add Friend
                    {request.length > 0 ? <div>{request.length}</div> : ''}
                  </button>
              </div>
          </div>
          {type === 'Add friend' ? 
          <AddFriend 
            user={user}
            setValue={setValue} 
            userFriend={userFriend}
            setIsAddFriend={setIsAddFriend}
            icon={icon}
            setIcon={setIcon}
            socket={socket}
          /> : <Request 
          request={request} user={user}
          /> }
        
        </Modal.Body>        
        <Modal.Footer>
        <Button variant="danger" onClick={initModal}>
            Close
        </Button>
        {type === 'Request add friend'? '':
        <Button variant="primary" onClick={()=>handleFindUser()}>
            Search
        </Button>}
        </Modal.Footer>
    </Modal>
    </>
  )
}
export default ModalDialog