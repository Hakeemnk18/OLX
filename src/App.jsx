import { Routes,Route, useNavigate } from 'react-router-dom'
import Home from './Pages/Home'
import SignupPage from './Pages/Signup'
import { useContext, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import{ AuthContext, FireBaseContext} from './store/FirbaseContext'
import Login from './Components/Login'
import { ToastContainer,toast } from 'react-toastify'
import CreatePage from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import Post from './store/PostContext'




function App() {
  
  const navigate = useNavigate()
  const {auth,db} = useContext(FireBaseContext)
  const {setUser} = useContext(AuthContext)
  

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,async(user)=>{
      if(user){
        console.log("logged in")
        setUser(user)
        
      }else{
        navigate('/login') 
        console.log("not logged")
        
      }
    })

    return ()=> unsubscribe()
  },[auth,db])
  

  return (
    <>
      <ToastContainer theme='dark' />
      <Post>
        <Routes>
          
            <Route path='/' element={<Home/>} />
            <Route path='/signup' element={<SignupPage/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<CreatePage />} />
            <Route path='/view' element={<ViewPost />} />
          
          
        </Routes>
      </Post>

      
    </>
  )
}

export default App
