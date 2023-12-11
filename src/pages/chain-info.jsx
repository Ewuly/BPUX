import { useState } from 'react'
import { Link, BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ethers } from 'ethers'


function chainInfo() {

    const [connectionStatus, setConnectionStatus] = useState('Disconnected'); // Added state for button text
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const [network, setNetwork] = useState(null);
    const [blockNumber, setBlockNumber] = useState(null);
    const [userAddress, setUserAddress] = useState(null);

    async function connect() {
        if (typeof window.ethereum !== "undefined") {
            try {
                await ethereum.request({ method: "eth_requestAccounts" })
                setConnectionStatus('Connected'); // Update button text
                const accounts = await ethereum.request({ method: "eth_accounts" })
                console.log(accounts)
            } catch (error) {
                console.log(error)
            }
        } else {
            setConnectionStatus('Please install MetaMask'); // Update button text
        }
    }


    const afficheData = async () => {
        try {
            
            const networkData = await provider.getNetwork();
            const blockNumberData = await provider.getBlockNumber();
            const userAddressData = await ethereum.request({ method: 'eth_accounts' });
    
            setNetwork(networkData);
            setBlockNumber(blockNumberData);
            setUserAddress(userAddressData);
    
            console.log(networkData);
            console.log(blockNumberData);
            console.log(userAddressData);
    
            if (networkData.chainId !== 11155111) {
                
                console.log('This is not Sepolia network.');
    
                // Provide a user-friendly message
                // const switchNetworkMessage = `Please switch to the Sepolia network (ID: 11155111) in your MetaMask.`;
                // alert(switchNetworkMessage);
    
                // Prompt the user to switch networks
                if (window.ethereum) {
                    try {
                        await window.ethereum.request({
                            method: 'wallet_switchEthereumChain',
                            params: [
                                {
                                    chainId: '0xaa36a7', // Sepolia network chain ID

                                },
                            ],
                        });
                        // Reload the page after switching the network
                    window.location.reload();
                    } catch (error) {
                        console.error("Error switching chain:");
                        console.error(error);
                    }
                }
            }
        } catch (error) {
            window.location.reload();
            console.error('Error fetching data:', error);
        }
    };
    
    
    

    return (
        <>
            <div>
                <h1>Chain Info</h1>
            </div>
            <div>
                <button onClick={connect}>Connect</button>
            </div>
            <div>
                <button onClick={afficheData}>Affiche data</button>
            </div>
            <div>
                <p>Connection Status: {connectionStatus}</p>
                <p>Network: {network && network.chainId}</p>
                <p>Block Number: {blockNumber}</p>
                <p>User Address: {userAddress}</p>
            </div>
            <div>
                <Link to="/">Page Principal</Link>

            </div>
        </>
    )
}

export default chainInfo