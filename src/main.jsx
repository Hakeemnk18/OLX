import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import {FireBaseContext} from './store/FirbaseContext.jsx'
import {auth, db } from './firebase.js'
import Context from './store/FirbaseContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FireBaseContext.Provider value={{auth,db}}>
        <Context>
          <App />
        </Context>
        
      </FireBaseContext.Provider>
       
    </BrowserRouter>
    
  </StrictMode>,
)
