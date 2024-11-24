import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { axios } from 'axios'

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const submitHandler = (e) => {
        e.preventDefault()
        axios.get('http://localhost:8000/api/login', {email, password}, {withCredentials:true})
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
    }






    return(
        <form onSubmit={submitHandler}>
            <h1>Login</h1>
            <div>
                <label>Email</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button>Login</button>
            <Link to="/register">Don't have an account?</Link>
        </form>
    )}

    export default Login;