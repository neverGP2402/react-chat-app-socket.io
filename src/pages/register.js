import React, { useState} from 'react';
import {toast} from 'react-toastify'
import {useNavigate, Link} from 'react-router-dom'
import {registerService} from '../service/axiosService'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';

function Register() {
  // set values 
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    checkAgree: false
  })
  
  const {name, email, password, confirmPassword} = values
  const navigate = useNavigate()
  const handleOnchangeValue = (e) =>{
    setValues({...values, [e.target.name]: e.target.value})
  }
//  check is valid
  const handleValidatations = () => {

    if(password !== confirmPassword){
      toast.error('Password is incorrect')
      return false
    }
    if(!email || !password || !name || !confirmPassword){
      toast.warning('Please enter a valid information')
      return false
    }
    return true
  }

  const handleRegister = async () => {
    if(handleValidatations()){
      try {
        const createUser = await registerService({
          email: email,
          password: password,
          name: name
        })
        if(!createUser.success){
          return toast.error(createUser.message)}
          else{
            localStorage.clear()
            toast.success(createUser.message)
            navigate('/login')
          }
        
        

      } catch (error) {
        toast.error('Register not successful')
      }
    }
  }
  return (
    <MDBContainer fluid className='d-flex align-items-center register justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Register</h2>
          <MDBInput wrapperClass='mb-4' name='name' label='Your Name' onChange={(e)=>{handleOnchangeValue(e)}}  size='lg' id='form1' type='text'/>
          <MDBInput wrapperClass='mb-4' name='email' label='Your Email' onChange={(e)=>{handleOnchangeValue(e)}} size='lg' id='form2' type='email'/>
          <MDBInput wrapperClass='mb-4' name='password' label='Password'  onChange={(e)=>{handleOnchangeValue(e)}} size='lg' id='form3' type='password'/>
          <MDBInput wrapperClass='mb-4' name='confirmPassword' label='Repeat your password' onChange={(e)=>{handleOnchangeValue(e)}} size='lg' id='form4' type='password'/>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'  onClick={()=>{handleRegister()}}>Register</MDBBtn>
          <div className='d-flex flex-row justify-content-center mb-4'>
               <label htmlFor="">Have already an account?</label> 
                <Link to={'/login'}>Login here</Link>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;