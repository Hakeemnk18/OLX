import React from 'react';
import {useEffect,useState,useContext} from 'react';
import Heart from '../assets/Heart';
import './Posts.css';
import { FireBaseContext } from '../store/FirbaseContext';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { PostContext } from '../store/PostContext';
import { useNavigate } from 'react-router-dom';


function Posts() {

  const{auth,db} = useContext(FireBaseContext)
  const [products,setProducts] = useState([])
  const {setProductDetails} = useContext(PostContext)
  const navigate = useNavigate()

  useEffect(()=>{
    getProduct()
  },[])

  const getProduct = async()=>{
    const snapShot = await getDocs(collection(db,'product'))
    
    const productList = snapShot.docs.map((product)=>{
      return {
        ...product.data(),
        id:product.id
      }
    })
    setProducts(productList)
    
  }
  const handleClick = () => {
    
    navigate("/view"); 
  };
  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

        {
          products.map((product)=>{
            return (
              <div
                className="card"
                onClick={()=> {
                  setProductDetails(product)
                  handleClick()
                }}
              >
                <div className="favorite">
                  <Heart></Heart>
                </div>
                <div className="image">
                  <img src={product.image_url} alt="" />
                </div>
                <div className="content">
                  <p className="rate">&#x20B9; {product.price}</p>
                  <span className="kilometer">{product.category}</span>
                  <p className="name"> {product.name}</p>
                </div>
                <div className="date">
                  <span>{product?.createdAt?.slice(4,15)}</span>
                </div>
              </div>
            )
          })
        }
          

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
