import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
//import AppCookieHttpOnly from './cookieHttpOnly/AppCookieHttpOnly'
import AppProtectedRoute from './protectedRoute/AppProtectedRoute'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProtectedRoute />
  </StrictMode>,
)
