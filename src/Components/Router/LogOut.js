import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.setItem('login', false)

        let login = localStorage.getItem('login');


    })
    return (
        <div>
            <h3>LogOut successfully</h3>
            <br />
            <Link to="/login" onClick={() => navigate('/login')}>Login Again</Link>

        </div>
    )
}

export default LogOut