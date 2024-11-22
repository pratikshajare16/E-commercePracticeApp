import React, { useState } from 'react'

const RegisterForm = () => {

  const [name, setName] = useState("");
  const [tnc, setTnc] = useState(false);
  const [interest, setInterest] = useState("")


  function getFormData(e) {
    console.log(name, tnc, interest)
    e.preventDefault(); // this prevent refresh 
  }

  return (
    <div className='App'>
      <h1>Register Form</h1>
      <form onSubmit={getFormData}>
        <input type='text' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />
        <br /><br />
        <select onChange={(e) => setInterest(e.target.value)}>
          <option>Select Option</option>
          <option>Marvel</option>
          <option>Dc</option>
        </select><br /><br />
        <input type='checkbox' onChange={(e) => setTnc(e.target.checked)} />
        <span>Accept Terms and conditions</span>
        <br /><br />
        <button type='submit'>Submit</button>
      </form>

    </div>


  )
}

export default RegisterForm