import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import Logo from '../../src/olx-logo.png';
import './Login.css';
import { FireBaseContext } from '../store/FirbaseContext';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword ,
  updateProfile 
}from 'firebase/auth';

import { addDoc, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Login() {

  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhon] = useState('')
  const [password,setPassword] = useState('')
  const [status,setStatus] = useState('signIn')
  const navigate = useNavigate()
  const {auth,db} = useContext(FireBaseContext)

  async function loginValidate(e){
      try {
        
        e.preventDefault()
        await signInWithEmailAndPassword(auth,email,password)
        console.log("validate user")
        navigate('/')
      } catch (error) {
        let errorCode = error.message.match(/\((.*?)\)/)?.[1] || "unknown-error";
        errorCode = errorCode.slice(5)
        toast.error(errorCode);
      }
  }
  //sign up function
  async function signUpValidate(e){
    try {
        e.preventDefault()
        const res = await createUserWithEmailAndPassword(auth,email,password)
        console.log("submitted")
        const user = res.user
        await updateProfile(user, {
          displayName: name
      });
        await addDoc(collection(db,"user"),{
            uid : user.uid,
            name,
            authProvider : "local",
            email,
            phone
        })
        console.log("add doc")
        navigate('/')
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
          
          {status === 'signUp' ?
            <> 
              <label htmlFor="fname">Name</label>
                <br />
                <input
                  className="input"
                  type="text"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                /> 
            </>
            :
            <> </>
            
          }
          <br />
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
          { status === 'signUp' ?
            <> 
            <label htmlFor="fname">Phone</label>
              <br />
              <input
                className="input"
                type="text"
                value={phone}
                onChange={(e)=> setPhon(e.target.value)}
              /> 
          </>
          :
          <> </>
          }
          <br />
          <br />
          {
            status === 'signUp' ? 
            <button type='submit' onClick={signUpValidate}>Signup</button> :
            <button type='submit' onClick={loginValidate}>Login</button>
          }
          
        </form>
        {
          status === 'signUp' ? 
          <a onClick={()=> setStatus("signIn")}>Login</a> :
          <a onClick={()=> setStatus("signUp")}>Signup</a>
        }
        
      </div>
    </div>
  );
}

export default Login;
