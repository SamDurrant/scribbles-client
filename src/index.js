import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './components/App/App'
import { ScribblesProvider } from './contexts/ScribblesContext'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScribblesProvider>
        <App />
      </ScribblesProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
