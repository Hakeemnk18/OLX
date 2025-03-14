import React, { useContext, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import './Create.css';
import Header from './Header';
import { toast } from 'react-toastify';
import { AuthContext, FireBaseContext } from '../store/FirbaseContext';
import axios from "axios";
import { addDoc, collection } from 'firebase/firestore';




const Create = () => {
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)
  const [uploading, setUploading] = useState(false);
  const {auth,db} = useContext(FireBaseContext)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()
  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dijkesgb1/image/upload";
  

  const handleImage = async ()=>{
    console.log("inside handle image")
    if (!image) return alert("Select an image first!");
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "olx-clone");
    

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      
      const data = await response.json();
      const imageUrl = data.secure_url;
      return imageUrl
    } catch (error) {
      console.log("inside image catch")
      console.log(error.message)
    }
  }

  const handleSubmit = async (e)=>{
    try {
      e.preventDefault()
      const image_url = await handleImage()
      console.log("get image url")
      await addDoc(collection(db,"product"),{
        name,
        category,
        price,
        image_url,
        createdAt:new Date().toString()
      })
      console.log("created")
      navigate('/')
    } catch (error) {
      console.log(error.message)
      let errorCode = error.message.match(/\((.*?)\)/)?.[1] || "unknown-error";
      errorCode = errorCode.slice(5)
      toast.error(errorCode);
    }
  }
  return (
    <>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=> setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=> setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
              className="input" 
              type="number" 
              value={price}
              onChange={(e)=> setPrice(e.target.value)} 
            />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          
            <br />
            <input type="file" onChange={(e)=> setImage(e.target.files[0])}/>
            <br />
            <button className="uploadBtn" type='submit' onClick={handleSubmit}>upload and Submit</button>
          </form>
        </div>
      </card>
    </>
  );
};

export default Create;
