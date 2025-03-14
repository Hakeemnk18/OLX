
import React, { useContext } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Logo from '../../src/olx-logo.png';
import './Signup.css';
import {FireBaseContext} from '../store/FirbaseContext';
import { createUserWithEmailAndPassword ,updateProfile} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

export default function Signup() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhon] = useState('')
    const [password,setPassword] = useState('')

    const {auth,db} = useContext(FireBaseContext)
    


    async function sumbmit(e){
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
            })
            console.log("add doc")
        } catch (error) {
            let errorCode = error.message.match(/\((.*?)\)/)?.[1] || "unknown-error";
            errorCode = errorCode.slice(5)
            toast.error(errorCode);
        }
        
        
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
