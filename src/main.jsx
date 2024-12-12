import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './i18n'
import { GlobalProvider } from './context/GlobalContext'
import { ThemeProvider } from '@material-tailwind/react'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </GlobalProvider>
  </React.StrictMode>,
)