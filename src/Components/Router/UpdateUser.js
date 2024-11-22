import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateUser = ({ route }) => {
    const location = useLocation();
    const { userId, userName, userEmail, userPhNo } = location.state || {};

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        setUser()
    }, [])


    function setUser() {
        setName(userName);
        setEmail(userEmail);
        setPhoneNumber(userPhNo);
    }
    function updateUserData() {
        let item = { name, email, phoneNumber }
        fetch(`http://localhost:4000/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        }).then((result) => {
            result.json().then((resp) => {
                console.log(result)
                alert(`User ${name} Updated`);
                navigate('/about')
            })
        }).catch((error) => console.error("Fetch error:", error));
    }
    return (
        <div>
            <h3>Update User Information</h3>
            <br />
            <div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} /><br /><br />
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /><br /> <br />
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /><br /><br />
                <button onClick={updateUserData} >Update User</button>

            </div>
        </div>
    )
}

export default UpdateUser