import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SetAvatar from './pages/SetAvatar';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Chat />} />
          <Route path='/setAvatar' element={<SetAvatar />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
