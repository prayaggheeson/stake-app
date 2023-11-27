import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { CLIENT_ID } from './component/Constants.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThirdwebProvider activeChain="binance-testnet" clientId="CLIENT_ID">
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ThirdwebProvider>,
)
