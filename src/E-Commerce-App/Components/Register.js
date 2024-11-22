import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Navigation/Header';

const Register = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("")
    const navigate = useNavigate();

    async function signUP() {

        console.log({ name, email, phoneNumber });
        let data = { name, password, email, phoneNumber }

        if (name != "" && email != "" && phoneNumber != "" && password != "") {
            let result = await fetch("http://localhost:4000/users/signup", {
                method: 'POST',
                headers: {
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            });

            result = await result.json()
            console.warn("result", result.login)
            let User_Info = [{ username: name, login: JSON.stringify(result.login) }]
            localStorage.setItem("user-info", JSON.stringify(User_Info));
            navigate("/add_product")




            // .then((response) => response.json())
            // .then((result) => {
            //     console.warn("result", result)

            //     if (result.ok) {
            //         alert("User Created")
            //         setName("")
            //         setPassword("")
            //         setEmail("")
            //         setPhoneNumber("")


            //     } else if (result.status == 409) {
            //         alert("User alredy exists.")
            //     }
            //     else {
            //         alert("User Not Created")
            //     }

            // })
            // .catch((error) => console.error("Error:", error));
        } else {
            alert("User Not Created, first enter values")
        }
    }

    return (
        <>
            <Header />
            <div className='col-sm-6 offset-sm-3' style={{ marginTop: "5%" }}>
                <h2>Sign Up</h2>
                <br />
                <input className='form-control' placeholder='Username'
                    type='text' value={name} onChange={(e) => setName(e.target.value)} /><br />
                <input className='form-control' placeholder='Password'
                    type='password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />
                <input className='form-control' placeholder='E-mail'
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <input className='form-control' placeholder='Phone Number' maxLength={10}
                    type='tel' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /><br />

                <button className='btn btn-primary' type='Submit' onClick={signUP}>Submit</button>
            </div>
        </>


    )
}

export default Register