import React from "react";
import {useNavigate} from 'react-router-dom'
import {LogoutOutlined} from '@ant-design/icons'
function Logout(){
    const navigate = useNavigate()
    const handleLogout= () =>{
        localStorage.clear()
        navigate('/login')
    }
    return(
        // <div className="logout" onClick={() =>{handleLogout()}}>
           <> 
                <LogoutOutlined onClick={() =>{handleLogout()}}/>
           </>
        /* </div> */
    )
}

export default Logout