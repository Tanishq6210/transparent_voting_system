// 1. npm i web3
// 2. import Web3 from 'web3';

import './App.css';
import { useState } from 'react';
import image1 from './Candidate_1.png';
import image2 from './Candidate_2.png';
import image3 from './Candidate_3.png';
import imageBG from './logo-no-background.png';
import { Auth, useAuth } from "@arcana/auth-react";
import { ethers } from "ethers"
import * as PushAPI from "@pushprotocol/restapi";

export default function App() {
  
  const { user, connect, isLoggedIn, loading, loginWithSocial, provider } = useAuth();

    let abi = [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "indexed": false,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "cnt",
            "type": "uint256"
          }
        ],
        "name": "newWave",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "ind",
            "type": "uint256"
          }
        ],
        "name": "giveVote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "getVotes",
        "outputs": [
          {
            "internalType": "uint256[3]",
            "name": "",
            "type": "uint256[3]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      },
      {
        "inputs": [],
        "name": "getAllVotes",
        "outputs": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "time",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              }
            ],
            "internalType": "struct voting.Vote[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
      }
    ]

  const [vote0,setVote0] = useState(0);
  const [vote1,setVote1] = useState(0);
  const [vote2,setVote2] = useState(0); 
  const [data, setData] = useState("0x66a9633AC8E529B6CcD8E4c752901A71FcDf54A7");
  const [arr, setVotes_array] = useState([]);
  const [buttonArcana, setButtonArcana] = useState('Connect To Arcana');
  const [notifications, setNotifications] = useState([])

  // let contractAddress = "0x6Df1B6dB729C765aa3F7ee8AB07f49366500089B"
  let contractAddress = "0xbcBBF00Ce07934940075f8ce73a684cB0093Ba44"


  async function opt_in() {
    const Provider = new ethers.providers.Web3Provider(provider);
      
    const signer = Provider.getSigner();

    await PushAPI.channels.subscribe({
      signer: signer,
      channelAddress: 'eip155:5:0x66a9633AC8E529B6CcD8E4c752901A71FcDf54A7', // channel address in CAIP
      userAddress: 'eip155:5:' + data, // user address in CAIP
      onSuccess: () => {
       console.log('opt in success');
       alert("OptedIn Successfully!!")
      },
      onError: (err) => {
        console.error("Error is:" + err.message);
      },
      env: 'staging'
    })
    
  }

  async function sendNotification(message) {
    const PK = '69e51a9f0c93ff5c52f66795b1434bf07ca827e412b38cfa52b3293ffc816c2e'; // channel private key
    const Pkey = `0x${PK}`;
    const signer = new ethers.Wallet(Pkey);

    await PushAPI.payloads.sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: `Transparent Voting System`,
        body: `Vote Confirmation`
      },
      payload: {
        title: `Vote Casted`,
        body: `${message}`,
        cta: '',
        img: ''
      },
      recipients: 'eip155:5:' + data, // recipient address
      channel: 'eip155:5:0x66a9633AC8E529B6CcD8E4c752901A71FcDf54A7', // your channel address
      onSuccess: () => {
        console.log('opt in success');
       },
       onError: (err) => {
         console.error("Error is:" + err.message);
       },
      env: 'staging'
    });
  }

  async function connectToArcana() {
    try {
      await connect();
      console.log("Connecting to Arcana...")
      const Provider = new ethers.providers.Web3Provider(provider);
      console.log(Provider)
      const sig = Provider.getSigner();
      console.log("Signer is: " + sig)
      const contract = new ethers.Contract(contractAddress, abi, sig);
      
      // console.log(info.address)
      initialize();
      console.log("user" + JSON.stringify(user))
      // opt_in();
      // sendNotification();
      // fetchSubscribers()
      // getNotifications()
      // getUserSubscribers()
      
    } catch(err) {
      console.log(err);
    }
  }

  async function fetchSubscribers() {
    console.log("Fetching Subscribers...")
    const subscribers = await PushAPI.user.getSubscribers({
      channel: 'eip155:5:0x66a9633AC8E529B6CcD8E4c752901A71FcDf54A7', // channel address in CAIP
      page: 1, // Optional, defaults to 1
      limit: 10, // Optional, defaults to 10
      env: 'staging' // Optional, defaults to 'prod'
    });
    console.log(subscribers);
    console.log("Fetched----------------------- ")
  }

  async function getUserSubscribers() {
    const subscriptions = await PushAPI.user.getSubscriptions({
      user: 'eip155:5:0xd85A74726DE0e9735018De2c69d9350B91D8F094', // user address in CAIP
      env: 'staging'
    });
    console.log("Subscriptions---------")
    console.log(subscriptions)
  }

  async function getUserNotification() {
    const notifications = await PushAPI.user.getFeeds({
      user: 'eip155:5:' + data, // user address in CAIP
      env: 'staging'
    });
    console.log("Notifications---------")
    console.log(notifications)
    setNotifications(notifications)
  }

  
  async function initialize(){
    const Provider = new ethers.providers.Web3Provider(provider);
    const sig = Provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, sig);
    const tx = await contract.getVotes();
    setVote0(tx[0].toNumber())
    setVote1(tx[1].toNumber())
    setVote2(tx[2].toNumber())
    await user.address;
    if(user.address != null) {
      setData(user.address)
      setButtonArcana("Welcome " + user.address)
    }
    
    const tx1 = await contract.getAllVotes();
    setVotes_array(tx1)
    opt_in()
  }

  // function connectToMetamask() {
  //   if(window.ethereum) {
  //     window.ethereum.request({method: 'eth_requestAccounts'})
  //     .then(res => {
  //       console.log(res)
  //       setButtonText('Connected to ' + res);
  //       console.log(res)
  //       // initialize()
  //       opt_in(res)
  //     })
  //   } else {
  //     alert("Install Metamask!!")
  //   }
  // }
  
  async function giveVote0() {
      console.log("Voting 0...")
      const Provider = new ethers.providers.Web3Provider(provider);
      const sig = Provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, sig);
      const tx = await contract.giveVote(0);
      const res = await tx.wait();
      console.log(res.events[0].args[3].toNumber())
      setVote0(res.events[0].args[3].toNumber())
      let message = "You have voted for Candidate A: " + res.events[0].args[2] + " successfully.";
      sendNotification(message)
  }

  async function giveVote1() {
    console.log("Voting 1...")
    const Provider = new ethers.providers.Web3Provider(provider);
      const sig = Provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, sig);
      const tx = await contract.giveVote(1);
      const res = await tx.wait();
      console.log(res.events[0].args[3].toNumber())
      setVote1(res.events[0].args[3].toNumber())
      let message = "You have voted for Candidate B: " + res.events[0].args[2] + " successfully.";
      sendNotification(message)
  }

  async function giveVote2() {
    console.log("Voting 2...")
    const Provider = new ethers.providers.Web3Provider(provider);
      const sig = Provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, sig);
      const tx = await contract.giveVote(2);
      const res = await tx.wait();
      console.log(res.events[0].args[3].toNumber())
      setVote2(res.events[0].args[3].toNumber())
      let message = "You have voted for Candidate C: " + res.events[0].args[2] + " successfully.";
      sendNotification(message)
  }


  if (window.performance) {
    if (performance.navigation.type == 1) {
      initialize()
    } else { }
  }


  return (
    <div className="App">
    <nav className='nav-bar'>
      <ul>  
        <li>
          <img className="card-image-bg" src={imageBG} alt="Image" />
        </li>
      {/* <li><h2>Transparent Voting System</h2></li> */}
      <li><button className="button_m" onClick={connectToArcana}>{buttonArcana}</button></li>
      
      </ul>
    </nav>
	    
      <div className="cards">
        <div className="card">
          <div className="card-image">
            <img src={image1} alt="Image" />
          </div>
          <div className="card-content">
            <h2 className="card-name">Candidate A</h2>
            <p className="card-age">Address: 0x923...1b0cc47d</p>
            <p className="card-votes">Votes: {vote0}</p>
            <button className="button" onClick={giveVote0}>VOTE A</button>     
          </div>
        </div>
        <div className="card">
          <div className="card-image">
            <img src={image2} alt="Image" />
          </div>
          <div className="card-content">
            <h2 className="card-name">Candidate B</h2>
            <p className="card-age">Address: 0xafED...D5eC0F0dF7</p>
            <p className="card-votes">Votes: {vote1}</p>
            <button className="button" onClick={giveVote1}>VOTE B</button>
          </div>
        </div>
        <div className="card">
          <div className="card-image">
            <img src={image3} alt="Image" />
          </div>
          <div className="card-content">
            <h2 className="card-name">Candidate C</h2>
            <p className="card-age">Address: 0x660...4d65A0b6e51</p>
            <p className="card-votes">Votes: {vote2}</p>
            <button className="button" onClick={giveVote2}>VOTE C</button>  
          </div>
        </div>
      </div>
      <center>
      <table className="table" border={1.5} cellPadding={10} style={{ border: '2px solid black' }}>
        <thead>
        <tr>
            <th>FROM ADDRESS</th>
            <th>TO ADDRESS</th>
            <th>TIME</th>
          </tr>
        </thead>
        <tbody>
          {
            arr.map(
              (info, ind) => {
                return (
                  <tr>
                    <td>{info[0]}</td>
                    <td>{info[2]}</td>
                    <td>{info[1].toNumber()}</td>
                  </tr>
                )
              }
            )
          }
        </tbody>
    </table>
    </center>
    <br></br><br></br>
    <center>
      <button className="button" onClick={getUserNotification}>Check Notifications</button>
    </center>
    <center>
      <table className="table" border={1.5} cellPadding={10} style={{ border: '2px solid black' }}>
        <thead>
        <tr>
            <th>FROM</th>
            <th>TITLE</th>
            <th>MESSAGE</th>
          </tr>
        </thead>
        <tbody>
          {
            notifications.map(
              (info, ind) => {
                return (
                  <tr>
                    <td>{info.app}</td>
                    <td>{info.title}</td>
                    <td>{info.message}</td>
                  </tr>
                )
              }
            )
          }
        </tbody>
    </table>
    </center>
    <br></br>
    </div>
  );
}
