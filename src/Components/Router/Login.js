import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    function login() {

        localStorage.setItem('login', true)

    }
    const navigate = useNavigate();

    useEffect(() => {

        let login = localStorage.getItem('login')
        if (login) {
            navigate('/')
        }
    });

    return (
        <div>
            <h3>Login</h3><br />
            <input placeholder='Username' /><br /><br />
            <input placeholder='Password' /> <br /><br />

            <button onClick={login}>Login</button>
        </div>
    )
}

export default Login;