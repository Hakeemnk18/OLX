import React, { useRef } from 'react';
import { useEffect,useState,useContext } from 'react';
import './View.css';
import { PostContext } from '../store/PostContext';
import { FireBaseContext } from '../store/FirbaseContext';
import { toast } from 'react-toastify';
import { doc, getDoc,getDocs,collection,query,where } from "firebase/firestore";


function View() {

    const[user,setUser] = useState()
    const {productDetails} = useContext(PostContext)
    const {db} = useContext(FireBaseContext)
    
    

    async function getUser(){
        try {
          

          if (!productDetails?.userId) {
              console.log("User ID is undefined or null");
              return null;
          }
  

          const usersCollection = collection(db, "user");
          const q = query(usersCollection, where("uid", "==",productDetails?.userId )); 

          const querySnapshot = await getDocs(q);
          if (querySnapshot.empty) {
              console.log(" No user found with name:", userName);
              return null;
          }

          const firstDoc = querySnapshot.docs[0];

          if (!firstDoc) {
              console.log(" No user found with UID:", productDetails?.userId);
              return null;
          }

          console.log(" User Found:", firstDoc.id, firstDoc.data());
          const user = {...firstDoc.data(),id:firstDoc.id}
          console.log(user)
          setUser(user)
          return 
  
          
        } catch (error) {
            console.log(error?.message)
            let errorCode = error.message?.match(/\((.*?)\)/)?.[1] || "unknown-error";
            errorCode = errorCode.slice(5)
            toast.error(errorCode);
        }
    }
    useEffect(()=>{
        getUser()
    },[])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={productDetails.image_url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {productDetails?.price} </p>
          <span>{productDetails?.name}</span>
          <p>{productDetails?.category}</p>
          <span>{productDetails?.createdAt?.slice(4,15)}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{user?.name}</p>
          <p>{user?.phone}</p>
        </div>
      </div>
    </div>
  );
}
export default View;