import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider,CHAIN  } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";

const auth = new AuthProvider(`6d9f24e8686c6eaf3ba4fa2d1ebcab4913c15868`, {
  position: 'left',
  theme: 'light',
  alwaysVisible: true,
  network: 'testnet', // network can be testnet or mainnet - defaults to testnet
  chainConfig: {
    chainId: CHAIN.POLYGON_MUMBAI_TESTNET,
    rpcUrl: 'https://matic-mumbai.chainstacklabs.com',
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProvideAuth provider={auth}>
        <App />
    </ProvideAuth>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
