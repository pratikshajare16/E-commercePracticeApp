import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export function NavLinks() {
    const [ChnageToLogout, setChangeToLogOut] = useState('Login');
    const navigate = useNavigate();
    useEffect(() => {

        let login = localStorage.getItem('login')
        if (login) {
            setChangeToLogOut('Logout')
        }



    }, [ChnageToLogout]);

    return (
        <div className="navbar-container">
            <ul className="navbar">
                <li> <NavLink className="nav-bar-link" to="/">Home</NavLink></li>
                <li> <NavLink className="nav-bar-link" to="/about">About</NavLink></li>
                <li> <NavLink className="nav-bar-link" to="/contact">Contact</NavLink></li>
                {/* <li> <NavLink className="nav-bar-link" to="/user/Pratiksha">User</NavLink></li> */}
                <li> <NavLink className='nav-bar-link' to='/filter'>Filter</NavLink></li>
                {ChnageToLogout === 'Logout' ? <li> <NavLink className='nav-bar-link' to='/logout'>Logout</NavLink></li>
                    : <li> <NavLink className='nav-bar-link' to='/login'>Login</NavLink></li>}
            </ul>



        </div>
    )
}