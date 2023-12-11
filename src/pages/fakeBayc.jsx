import React, { useEffect, useState } from 'react';
import { abi, contractAddress } from "./fakeBaycContract.js";
import { ethers } from 'ethers'; // Import ethers library

function FakeBayc() {
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    const [contractName, setContractName] = useState('');
    const [totalTokens, setTotalTokens] = useState(0);

    async function connect() {
        if (typeof window.ethereum !== "undefined") {
            try {
                await ethereum.request({ method: "eth_requestAccounts" })
                setConnectionStatus('Connected');
                const accounts = await ethereum.request({ method: "eth_accounts" })
                console.log(accounts)
            } catch (error) {
                console.log(error)
            }
        } else {
            setConnectionStatus('Please install MetaMask');
        }
    }

    useEffect(() => {
        async function fetchContractData() {
            try {
                if (typeof window.ethereum !== "undefined") {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(contractAddress, abi, signer);

                    const name = await contract.name();
                    setContractName(name);
                    console.log(name);

                    const totalSupply = await contract.totalSupply();
                    setTotalTokens(totalSupply.toString());
                    console.log(totalSupply.toString());
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchContractData();
    }, []);

    async function mintToken() {
        try {
            if (typeof window.ethereum !== "undefined") {
                console.log('MetaMask is installed!');
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);

                const transaction = await contract.claimAToken();
                await transaction.wait(); // Wait for the transaction to be mined

                console.log('Transaction details:', transaction);
            } else {
                try {
                    await ethereum.request({ method: "eth_requestAccounts" })
                    setConnectionStatus('Connected');
                    const accounts = await ethereum.request({ method: "eth_accounts" })
                    console.log(accounts)
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error);
            console.error(error);
        }
    }

    return (
        <>
            <div>
                <button onClick={connect}>Connect</button>
                <p>Status: {connectionStatus}</p>
            </div>
            <div>
                <h2>Contract Information</h2>
                <p>Name: {contractName}</p>
                <p>Total Tokens: {totalTokens}</p>
            </div>
            <div>
                <button onClick={mintToken}>Mint Token</button>
            </div>
        </>
    );
}

export default FakeBayc;
