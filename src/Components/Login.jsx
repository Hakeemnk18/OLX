import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import Logo from '../../src/olx-logo.png';
import './Login.css';
import { FireBaseContext } from '../store/FirbaseContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

function Login() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const {auth,db} = useContext(FireBaseContext)

  async function userValidate(e){
      try {
        
        e.preventDefault()
        await signInWithEmailAndPassword(auth,email,password)
        console.log("validate user")
      } catch (error) {
        let errorCode = error.message.match(/\((.*?)\)/)?.[1] || "unknown-error";
        errorCode = errorCode.slice(5)
        toast.error(errorCode);
      }
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
          <br />
          <br />
          <button type='submit' onClick={userValidate}>Login</button>
        </form>
        <Link to={'/signup'}><a>Signup</a></Link>
      </div>
    </div>
  );
}

export default Login;
