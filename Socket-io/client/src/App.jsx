import { useState, useEffect } from 'react'
import io from 'socket.io-client';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import UserForm from './components/UserForm';
import Chat from './components/Chat';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [socket] = useState(() => io(':8000'));

  useEffect(() => {
    console.log('Is this running?');
    socket.on('connect', () => {
      console.log(`Connected: ${socket.id}`);
    });

    return () => socket.off();
  }, []);



  return (
    <>
<h1 className="text-center text-primary mb-4">CHIT CHAT CHATTER</h1>
    <Routes>
      <Route path='/' element={<UserForm socket={socket} />} />
      <Route path='/chat' element={<Chat socket={socket} />} />
    </Routes>
    </>
  )
}

export default App
