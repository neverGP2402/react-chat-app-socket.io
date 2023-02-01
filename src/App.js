import './App.css';
import 'antd/dist/reset.css';
import {ToastContainer} from 'react-toastify'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './pages/register';
import Login from './pages/login';
import SetAvatar from './pages/setAvatar';
import Chat from './pages/chatHome';

function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element = {<Register/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/set-avatar' element = {<SetAvatar/>}/>
        <Route path='/' element = {<Chat/>}/>
      </Routes>
      </BrowserRouter>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
      />
    </div>
  );
}

export default App;
