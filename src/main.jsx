import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. Import
import './index.css'
import App from './App.jsx'
import "./styles.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
<BrowserRouter> {/* 2. Wrap your App */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
