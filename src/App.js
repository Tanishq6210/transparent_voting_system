// 1. npm i web3
// 2. import Web3 from 'web3';

import './App.css';
import Web3 from 'web3';
import { useState } from 'react';
function App() {
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
  let contractAddress = "0x6Df1B6dB729C765aa3F7ee8AB07f49366500089B"
  const web3 = new Web3(Web3.givenProvider);
  var contract = new web3.eth.Contract(abi, contractAddress)

  const [vote0,setVote0] = useState(0);
  const [vote1,setVote1] = useState(0);
  const [vote2,setVote2] = useState(0); 
  const [data, setData] = useState("0x66a9633AC8E529B6CcD8E4c752901A71FcDf54A7");
  const [arr, setVotes_array] = useState([]);
  const [buttonText, setButtonText] = useState('Connect To Metamask');

  function connectToMetamask() {
    if(window.ethereum) {
      window.ethereum.request({method: 'eth_requestAccounts'})
      .then(res => {
        console.log(res)
        setData(res)
        setButtonText('Connected to ' + res);
      })
    } else {
      alert("Install Metamask!!")
    }
  }

  function giveVote0() {
      console.log("Voting 0...")
      contract.methods.giveVote(0)
      .send({
          from:data[0],
      })
      .then((result) => {
        setVote0(result.events.newWave.returnValues.cnt)
          console.log(result);
      })
  }

  function giveVote1() {
    console.log("Voting 1...")
    contract.methods.giveVote(1)
    .send({
        from:data[0],
    })
    .then((result) => {
      setVote1(result.events.newWave.returnValues.cnt)
        console.log(result);
    })
  }

  function giveVote2() {
    console.log("Voting 2...")
    contract.methods.giveVote(2)
    .send({
        from:data[0],
    })
    .then((result) => {
      setVote2(result.events.newWave.returnValues.cnt)
        console.log(result);
    })
  }


  if (window.performance) {
    if (performance.navigation.type == 1) {
      console.log("Page reloaded successfully")
      contract.methods.getVotes().call()
      .then((result) => {
          setVote0(result[0])
          setVote1(result[1])
          setVote2(result[2])
      })
      contract.methods.getAllVotes().call()
      .then((result) => {
        setVotes_array(result)
        console.log(result)
      })
    } else {
      alert( "This page is not reloaded");
    }
  }

  

  return (
    <div className="App">
    <nav className='nav-bar'>
      <ul>
        <li><h2>Transparent Voting System</h2></li>
        <li><button className="button_m" onClick={connectToMetamask}>{buttonText}</button></li>
      </ul>
    </nav>
    <main className="App-content">
      Candidate 1: <label>{vote0}</label><br></br>
      Candidate 2: <label>{vote1}</label><br></br>
      Candidate 3: <label>{vote2}</label><br></br>
	    <button className="button" onClick={giveVote0}>VOTE A</button>
      <button className="button" onClick={giveVote1}>VOTE B</button>
      <button className="button" onClick={giveVote2}>VOTE C</button><br></br>
      <br></br>
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
      </main>
    <footer className="App-footer">
        <p>Footer</p>
      </footer>
    </div>
  );
}

export default App;
