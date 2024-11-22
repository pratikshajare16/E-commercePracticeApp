import { Alert } from 'bootstrap';
import React, { useState } from 'react'
const NewUser = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    function saveUser() {

        console.log({ name, email, phoneNumber });
        let data = { name, email, phoneNumber }

        if (name != "" && email != "" && phoneNumber != "") {
            fetch("http://localhost:4000/users", {
                method: 'POST',
                headers: {
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            }).then((result) => {
                console.warn("result", result)

                if (result.ok) {
                    alert("User Created")
                    setName("")
                    setEmail("")
                    setPhoneNumber("")



                } else {
                    alert("User Not Created")
                }

            })
                .catch((error) => console.error("Error:", error));
        } else {
            alert("User Not Created, first enter values")
        }

    }

    return (
        <div style={{
            maxWidth: '600px', margin: '0 auto', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        }}>
            <h5 style={{ textAlign: 'center', marginBottom: '20px' }}>Create New User</h5>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '15px' }}>
                <h6 style={{ marginRight: '15px', width: '120px' }}>Name <span style={{ color: 'red' }}>*</span></h6>
                <input
                    type='text'
                    required
                    style={{ flex: 1, padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '15px' }}>
                <h6 style={{ marginRight: '15px', width: '120px' }}>Email <span style={{ color: 'red' }}>*</span></h6>
                <input type='email'
                    required
                    style={{ flex: 1, padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '15px' }}>
                <h6 style={{ marginRight: '15px', width: '120px' }}>Phone Number <span style={{ color: 'red' }}>*</span></h6>
                <input type='tel'
                    required
                    style={{ flex: 1, padding: '8px', fontSize: '14px', borderRadius: '4px', border: '1px solid #ccc' }}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}

                />
            </div>

            <button type="submit"
                style={{
                    padding: '10px 20px', fontSize: '16px', backgroundColor: '#4CAF50', color: '#fff',
                    border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '20px'
                }}
                onClick={saveUser} >
                Submit
            </button>
        </div>

    )
}

export default NewUser;