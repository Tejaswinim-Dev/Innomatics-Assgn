import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router';
import Signup from './Components/signup/Signup';
import Login from './Components/login/Login';
import Chat from './Components/chat/Chat';


function App() {
  return (
    <div>
      <BrowserRouter>
    <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/chat' element={<Chat/>} />

        

    </Routes>
  </BrowserRouter>
    </div>
  )
}

export default App
