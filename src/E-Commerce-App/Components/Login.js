import React, { useState } from 'react'
import Header from './Navigation/Header'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function Login() {

        console.log({ email, password });
        let data = { email, password, }

        if (email != "" && password != "") {
            let result = await fetch("http://localhost:4000/users/login", {
                method: 'POST',
                headers: {
                    'Accept': "application/json",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            }).then(async (result) => {

                if (result.ok) {
                    result = await result.json()
                    console.log("response", result.username)
                    let User_Info = [{ username: result.username, login: JSON.stringify(result.login) }]
                    localStorage.setItem("user-info", JSON.stringify(User_Info));
                    navigate("/add_product")
                    alert("Login Successful..")

                } else {
                    alert("Login Unsuccessful..")
                }

            })

        } else {
            alert("Enter Valid Credentials")
        }
    }

    return (
        <>
            <Header />
            <div className='col-sm-6 offset-sm-3' style={{ marginTop: "5%" }}>
                <h2>Login</h2>
                <br />
                <input className='form-control' placeholder='Username'
                    type='text' value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <input className='form-control' placeholder='Password'
                    type='password' value={password} onChange={(e) => setPassword(e.target.value)} /><br />

                <button className='btn btn-primary' type='Submit' onClick={Login}>Submit</button>
            </div>
        </>
    )
}

export default Login