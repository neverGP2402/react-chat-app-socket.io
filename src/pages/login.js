import './auth.scss'
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {loginService} from '../service/axiosService'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';

function Login () {
    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate()
    const {email, password} = values
    console.log(values)
    // check user login?
    useEffect(() => {
        function login() {
            const local = JSON.parse(localStorage.getItem('chat-application-user'))
           
            if(local) {
                navigate('/')
            }
        }
        login()
    }, [])

    const handleOnchangeValue = (e) =>{
        setValues({...values, [e.target.name]:e.target.value})
    }

    const validatetionForm = () => {
        if(!email){ 
            toast.warning('Please enter a valid email!.')
            return false
        }
        if(!password){ toast.warning('Please enter a valid password!.')
            return false
        }
        return true
    }

    const handleLoginForm = async() => {
        if(validatetionForm() ===true) {
            const resLogin = await loginService({email, password})
            if(!resLogin.success){return toast.error(resLogin.message)}
            localStorage.setItem('chat-application-user', JSON.stringify(resLogin.user))
            navigate('/set-avatar')
        }

    }
    return  (
        <div className="login">
        <MDBContainer className="my-5">

            <MDBCard>
                <MDBRow className='g-0'>

                <MDBCol md='6'>
                    <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
                </MDBCol>

                <MDBCol md='6'>
                    <MDBCardBody className='d-flex flex-column'>

                    <div className='d-flex flex-row mt-2'>
                        <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                    <span className="h1 fw-bold mb-0">Logo </span>
                    </div>

                    <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>

                        <MDBInput wrapperClass='mb-4' label='Email address' name='email' onChange={(e) => {handleOnchangeValue(e)}}  type='email' size="lg"/>
                        <MDBInput wrapperClass='mb-4' label='Password' name='password' onChange={(e) => {handleOnchangeValue(e)}} type='password' size="lg"/>

                    <MDBBtn className="mb-4 px-5" color='dark' size='lg' onClick={()=>{handleLoginForm()}}>Login</MDBBtn>
                    
                {/* <a className="small text-muted" href="#!">Forgot password?</a> */}
                <Link to={'/register'} className='small text-muted'>Forgot password?</Link>
                    <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <Link to={'/register'} style={{color: '#393f81'}}>Register here</Link></p>
                    
                
                    </MDBCardBody>
                </MDBCol>
                <MDBCol col='6' md='12' className='p-4'>
                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0">OR</p>
                    </div>
                    <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
                        <MDBIcon fab icon="facebook-f" className="mx-2"/>
                        Continue with facebook
                    </MDBBtn>

                    <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#55acee'}}>
                        <MDBIcon fab icon="google" className="mx-2"/>
                        Continue with Google
                    </MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBCard>

        </MDBContainer>
        </div>
    );
}

export default Login;