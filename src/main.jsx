import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThirdwebProvider } from "@thirdweb-dev/react";

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThirdwebProvider activeChain="binance-testnet" clientId="bda3a1c1b783abcc0302a33290b4a568">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ThirdwebProvider>,
)
