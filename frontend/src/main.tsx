
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AthleteProvider } from './context/AthleteContext'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './App.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AthleteProvider>
      <App />
    </AthleteProvider>
  </React.StrictMode>
)
