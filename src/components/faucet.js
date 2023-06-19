import { useEffect, useState } from 'react';
import contract from "../contracts/FCFaucet.json"
import { ethers } from 'ethers';
import './App.css';
import React from 'react';


const contractAddress = "0x50CF23A548D4e167C1E08ad96c404F07A70819a7";
const abi = contract.abi;

function Faucet() {

    const [currentAccount, setCurrentAccount] = useState(null);
    
    const checkWalletIsConnected = async () => {
      const { ethereum } = window;
  
      if (!ethereum) {
        console.log("Make sure you have Metamask installed!");
        return;
      } else {
        console.log("Wallet exists! We're ready to go!")
      }
  
      const accounts = await ethereum.request({ method: 'eth_accounts' });
  
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    }
  
     const connectWalletHandler = async () => {
      const { ethereum } = window;
  
      if (!ethereum) {
        alert("Please install Metamask!");
      }
  
      try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        console.log("Found an account! Address: ", accounts[0]);
        setCurrentAccount(accounts[0]);
      } catch (err) {
        console.log(err)
      }
    }
  
    const claimTokenHandler =  async () => { 
      try {
        const { ethereum } = window;
  
        if(ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, abi, signer);
  
          console.log("Initialise Payment");
          let claim = await contract.send();
  
  
          console.log("Claiming tokens");
          await contract.wait();
  
          console.log(`Tokens claimed : https://bscscan.com/tx/${claim.hash}`);
  
        }
        else { console.log("Ethereum object doesn't exist!");
        }
      } catch (err) {
        console.log(err);
      }
    
    }
    
    
  
    const connectWalletButton = () => {
      return (
        <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
          Connect Wallet
        </button>
      )
    }
  
    const claimToken = () => {
      return (
        <button onClick={claimTokenHandler} className='cta-button claim-token-button'>
          Claim 1 Token
        </button>
      )
    }
  
    useEffect(() => {
      checkWalletIsConnected();
    }, [])
  
    return (
      <div className='main-app'>
        <h1 className="text-heading">Join FightClub</h1>
        <p> 4% Marketing, 1% Buyback, 1% LP, 1.5% Max Wallet
             </p>
             <p>Earn a 5% referral fee for everyone you refer to the Fight Club. </p>
             <a href="https://t.me/fightclubportal"> Join The TG</a>
        <div>
          {currentAccount ? claimToken() : connectWalletButton()}
        </div>
      </div>
    )
  }
  
  export default Faucet;
  