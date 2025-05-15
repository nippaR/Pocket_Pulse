import { useState, useEffect } from 'react';
// import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import IMG1 from '../../Assets/bgC1.avif';
import { Box, Typography } from '@mui/material';
import IMG2 from '../../Assets/crypto.avif';

function ConnectAccount() {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [balance, setBalance] = useState("");
    const [error, setError] = useState(false);

    // const successMessage = "Wallet connected successfully";
    const errorMessage = "Wallet is not connected. Please connect your wallet.";

    const INFURA_ID = "3ebd2f0cfb764c5fa4a4ac3bf31a8c12";
    const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`);

    const checkIfWalletConnected = async () => {
        try {
        if (!window.ethereum) return;

        const accounts = await window.ethereum.request({ method: "eth_accounts" });

        if (accounts.length > 0) {
            const address = accounts[0];
            setCurrentAccount(address);

            const balance = await provider.getBalance(address);
            const showBalance = `${ethers.utils.formatEther(balance)} ETH`;
            setBalance(showBalance);
            console.log("Balance:", showBalance);
            setError(false); // connected, no error
        } else {
            setCurrentAccount(null);
            setError(true); // no wallet connected
        }
        } catch (error) {
        console.error("Wallet connection error:", error.message || error);
        setError(true);
        }
    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);

    //account change event
    useEffect(()=>{
        async function accountChanged() {
        window.ethereum.on("accountsChanged", async function () {
            const account = await window.ethereum.request({ method: "eth_accounts" });
            if(account.length){
            setCurrentAccount(account[0]);
            }else{
            window.location.reload();
            }
        });
        }
        accountChanged();
    },[]);

    const connectWallet = async () => {
        try {
        if (!window.ethereum) return alert("Please install MetaMask");

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setCurrentAccount(accounts[0]);
        setError(false); // success
        window.location.reload();
        } catch (error) {
        console.error("Connect wallet error:", error.message || error);
        setError(true); // error while connecting
        }
    };

    return (
        <Box>
        {error && <p style={{ color: 'red' }}>{errorMessage}</p>}

        {!currentAccount ? (
            <Box>
                <img src={IMG1} alt="Background" style={{ width: '100%', height: 'auto' }} />
                <button onClick={connectWallet} className="btn btn-primary">
                Connect Wallet
                </button>
            </Box>
        ) : (
            <Box sx={{  padding: 2,
                        backgroundColor: 'Gold',
                        borderRadius: 5,
                        width: '500px',
                        height: '400px',
                        display: 'column',
                        justifyContent: 'center',
                        boxShadow: 3,
                        }}>
                <Box sx={{ml:18}}>
                    <Typography sx={{ fontSize:30, fontFamily:'poppins', fontWeight:'semi-bold'}}>Wallet Details</Typography>
                    <img src={IMG2} alt="Background" style={{ width: '190px', height: 'auto'}} />
                </Box>
                
                <p>Wallet Address: {currentAccount}</p>
                <p>Balance: {balance}</p>
            </Box>
        )}
        </Box>
    );
}

export default ConnectAccount;
