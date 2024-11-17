import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';




const UserForm = (props) => { 

    const {socket} = props
    const navigate = useNavigate();
    const [username, setUsername] = useState('')



    const submitHandler = (e) => {
        
        e.preventDefault();
        socket.emit('new_user', username)
        navigate('/chat')
    }




    return (
        <form onSubmit={submitHandler}>
            <div>
            <label>Username </label>
            <input type="text" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <input type="submit" value="Submit" />
        </form>
    )}

    export default UserForm;