import { Routes,Route, useNavigate } from 'react-router-dom'
import Home from './Pages/Home'
import SignupPage from './Pages/Signup'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignupPage/>} />
      </Routes>

      
    </>
  )
}

export default App
