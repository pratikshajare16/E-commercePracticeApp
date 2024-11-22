import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const ProtectedRoute = (props) => {
    const { Component } = props;

    const navigate = useNavigate();
    useEffect(() => {
        let login = localStorage.getItem('login')
        console.log(login)
        if (!login) {
            navigate('/login')
        }
    });

    return (
        <div>
            <Component />
        </div>
    )
}

export default ProtectedRoute