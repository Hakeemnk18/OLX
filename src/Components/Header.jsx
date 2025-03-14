import React, { useContext } from 'react'
import './Header.css';
import OlxLogo from '../assets/OlxLogo';
import Search from '../assets/Search';
import Arrow from '../assets/Arrow';
import SellButton from '../assets/SellButton';
import SellButtonPlus from '../assets/SellButtonPlus';
import { AuthContext } from '../store/FirbaseContext';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { FireBaseContext } from '../store/FirbaseContext';
import { Link } from 'react-router-dom';


function Header() {

    const {user}  = useContext(AuthContext)
    const {auth} = useContext(FireBaseContext)
    
    

    const logout = async ()=>{
      try {
          signOut(auth)
      } catch (error) {
        let errorCode = error.message.match(/\((.*?)\)/)?.[1] || "unknown-error";
        errorCode = errorCode.slice(5)
        toast.error(errorCode);
      }
    }
    return (
      <div className="headerParentDiv">
        <div className="headerChildDiv">
          <div className="brandName">
            <OlxLogo></OlxLogo>
          </div>
          <div className="placeSearch">
            <Search></Search>
            <input type="text" />
            <Arrow></Arrow>
          </div>
          <div className="productSearch">
            <div className="input">
              <input
                type="text"
                placeholder="Find car,mobile phone and more..."
              />
            </div>
            <div className="searchAction">
              <Search color="#ffffff"></Search>
            </div>
          </div>
          <div className="language">
            <span> ENGLISH </span>
            <Arrow></Arrow>
          </div>
          <div className="loginPage">
            {user ? <span>{user.displayName || "user"}</span> : <Link to={'/login'}><span>Login</span></Link>}
            <hr />
           
          </div>
          {user ? <span onClick={logout} className='logout-btn'>Logout</span> : <></>}
          <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Header;
