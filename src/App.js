// 1. npm i web3
// 2. import Web3 from 'web3';

import './App.css';
import Web3 from 'web3';
import { useState } from 'react';
import image from './catt.jpg';
import { Auth, useAuth } from "@arcana/auth-react";
import { ethers } from "ethers"

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
  

  // const web3 = new Web3(Web3.givenProvider);
  // var contract = new web3.eth.Contract(abi, contractAddress)
  const [vote0,setVote0] = useState(0);
  const [vote1,setVote1] = useState(0);
  const [vote2,setVote2] = useState(0); 
  const [data, setData] = useState("0x66a9633AC8E529B6CcD8E4c752901A71FcDf54A7");
  const [arr, setVotes_array] = useState([]);
  const [buttonText, setButtonText] = useState('Connect To Metamask');
  const [buttonArcana, setButtonArcana] = useState('Connect To Arcana');

  let contractAddress = "0x6Df1B6dB729C765aa3F7ee8AB07f49366500089B"

  async function connectToArcana() {
    
    try {
      await connect();
      console.log("Connecting to Arcana...")
      const Provider = new ethers.providers.Web3Provider(provider);
      console.log(Provider)
      const sig = Provider.getSigner();
      console.log("Signer is: " + sig)
      const contract = new ethers.Contract(contractAddress, abi, sig);
      const tx = await contract.giveVote(0);
      console.log(tx)
      const res = await tx.wait();
      console.log("res", res.events[0].args);
      // const tx1 = await contract.getAllVotes();
      // console.log(tx1)
      // setVotes_array(tx1)
    } catch(err) {
      console.log(err);
    }
  }


  // function initialize(){
  //   contract.methods.getVotes().call()
  //     .then((result) => {
  //         setVote0(result[0])
  //         setVote1(result[1])
  //         setVote2(result[2])
  //     })
  //     contract.methods.getAllVotes().call()
  //     .then((result) => {
  //       setVotes_array(result)
  //     })
  // }

  // async function connectToMetamask() {
  //   if(window.ethereum) {
  //     window.ethereum.request({method: 'eth_requestAccounts'})
  //     .then(res => {
  //       console.log(res)
  //       setData(res)
  //       setButtonText('Connected to ' + res);
  //       initialize()
  //     })
  //   } else {
  //     alert("Install Metamask!!")
  //   }
  // }
  
  async function giveVote0() {
      console.log("Voting 0...")
      const Provider = new ethers.providers.Web3Provider(provider);
      console.log(Provider)
      const sig = Provider.getSigner();
      console.log("Signer is: " + sig)
      const contract = new ethers.Contract(contractAddress, abi, sig);
      const tx = await contract.giveVote(0);
      console.log(tx)
      const res = await tx.wait();
      console.log("res", res.events[0].args);
  }

  async function giveVote1() {
    console.log("Voting 1...")
    const Provider = new ethers.providers.Web3Provider(provider);
      console.log(Provider)
      const sig = Provider.getSigner();
      console.log("Signer is: " + sig)
      const contract = new ethers.Contract(contractAddress, abi, sig);
      const tx = await contract.giveVote(1);
      console.log(tx)
      const res = await tx.wait();
      console.log("res", res.events[0].args);
  }

  async function giveVote2() {
    console.log("Voting 2...")
    const Provider = new ethers.providers.Web3Provider(provider);
      console.log(Provider)
      const sig = Provider.getSigner();
      console.log("Signer is: " + sig)
      const contract = new ethers.Contract(contractAddress, abi, sig);
      const tx = await contract.giveVote(2);
      console.log(tx)
      const res = await tx.wait();
      console.log("res", res.events[0].args);
  }


  // if (window.performance) {
  //   if (performance.navigation.type == 1) {
  //     initialize()
  //   } else { }
  // }


  return (
    <div className="App">
    <nav className='nav-bar'>
      <ul>  
      <li><h2>Transparent Voting System</h2></li>
      <li><button className="button_m" onClick={connectToArcana}>{buttonArcana}</button></li>
      {/* <li><button className="button_m" onClick={connectToMetamask}>{buttonText}</button></li> */}
      </ul>
    </nav>
	    
      <div className="cards">
        <div className="card">
          <div className="card-image">
            <img src={image} alt="Image" />
          </div>
          <div className="card-content">
            <h2 className="card-name">Bloii the poopee</h2>
            <p className="card-age">20 years old</p>
            <p className="card-votes">{vote0} votes</p>
            <button className="button" onClick={giveVote0}>VOTE A</button>     
          </div>
        </div>
        <div className="card">
          <div className="card-image">
            <img src={image} alt="Image" />
          </div>
          <div className="card-content">
            <h2 className="card-name">BloiBlo the peepee</h2>
            <p className="card-age">20 years old</p>
            <p className="card-votes">{vote1} votes</p>
            <button className="button" onClick={giveVote1}>VOTE B</button>
          </div>
        </div>
        <div className="card">
          <div className="card-image">
            <img src={image} alt="Image" />
          </div>
          <div className="card-content">
            <h2 className="card-name">Blo the peepee</h2>
            <p className="card-age">20 years old</p>
            <p className="card-votes">{vote2} votes</p>
            <button className="button" onClick={giveVote2}>VOTE C</button>  
          </div>
        </div>
      </div>
      <center>
      <table border={1} cellPadding={10} style={{ border: '2px solid black' }}>
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
                    <td>{info.from}</td>
                    <td>{info.to}</td>
                    <td>{info.time}</td>
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
