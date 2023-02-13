import React,{useState} from 'react';
import { Avatar} from 'antd'
import avataDefault from '../../../assets/image/userDefaut.png'
import CallMicro from '../CallModal/callMicro';
import ModalVideoCall from '../CallModal/callVideo';

function HeaderChatWindow ({userChat,userOnline}) {
    const [modalShow, setModalShow] = useState(false);
    const isOnline = (id) => {
        const user = userOnline.find(user => user.userId === id)
        return user ? true : false
    }

    return (
        <div className='header'>
            <div className="header-left">
                <div className="avt">
                    <Avatar src={userChat.avatar ? `data:image/svg+xml;base64,${userChat.avatar}`: avataDefault} size={50}></Avatar>
                </div>
                <div className="info m-lg-3">
                    <div className="name">{userChat.name}</div>
                    <div className={isOnline(userChat._id) ? "status online": 'status' }>{isOnline(userChat._id) ? 'Online' : 'Offline'}</div>
                </div>
            </div>
            <div className="header-right">
                <div className="button">
                    <button style={{color:'#0abb87'}}   
                        onClick={()=>setModalShow(!modalShow)}
                    >
                        <CallMicro
                            modalShow={modalShow}
                            setModalShow={setModalShow}
                        />
                        {/* <ModalVideoCall/> */}
                        <i className="fas fa-phone-volume"></i>
                    </button>
                </div>
                <div className="button">
                    <button style={{color:'#ffb822'}}><i className="fas fa-video"></i></button>
                </div><div className="button">
                    <button style={{color:'#0abb87'}}><i className="fas fa-list-ul"></i></button>
                </div>
            </div>
        </div>
    )
}

export default HeaderChatWindow;