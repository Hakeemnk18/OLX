
import React from 'react';
import { useState } from 'react';

import Logo from '../../src/olx-logo.png';
import './Signup.css';

export default function Signup() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhon] = useState('')
    const [password,setPassword] = useState('')

    
    function sumbmit(e){
        e.preventDefault()
        console.log("inside submit")
        console.log("name "+name)
        console.log("phone "+phone)
        console.log("email "+email)
        console.log("password "+password)
    }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={name}
            onChange={(e)=> setName(e.target.value)}
            
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="femail"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id='fphon'
            value={phone}
            onChange={(e)=> setPhon(e.target.value)}
            
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id='fpassword'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            
          />
          <br />
          <br />
          <button type='submit' onClick={sumbmit}>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
