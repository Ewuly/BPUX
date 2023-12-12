import React, { useEffect, useState } from 'react';
import { abi, contractAddress } from "./fakeNefturiansContract.js";
import { ethers } from 'ethers'; // Import ethers library

function FakeNefturians() {
    const [minTokenPrice, setMinTokenPrice] = useState(0);
    const [connectionStatus, setConnectionStatus] = useState('Disconnected'); // Added state for button text
    const [contractName, setContractName] = useState('');

    useEffect(() => {
        const fetchMinTokenPrice = async () => {
            try {
                if (typeof window.ethereum !== 'undefined') {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    const contract = new ethers.Contract(contractAddress, abi, signer);

                    // Call the contract function to get the minimum token price
                    let minPrice = await contract.tokenPrice();
                    // Convert the price from wei to ETH 
                    minPrice = ethers.utils.formatEther(minPrice);


                    setMinTokenPrice(minPrice);
                } else {
                    console.error('Web3 provider not found');
                }
            } catch (error) {
                console.error('Error fetching minimum token price:', error.message);
            }
        };

        fetchMinTokenPrice();
    }, []);

    const handleBuyToken = async () => {
        try {
            if (typeof window.ethereum !== 'undefined') {
                const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
                const signer = provider.getSigner();

                // Create contract instance without passing the signer
                const contract = new ethers.Contract(contractAddress, abi);

                // Convert minTokenPrice to wei
                const valueInWei = ethers.utils.parseEther(minTokenPrice).add(ethers.utils.parseEther('0.01'));

                // Replace 'value' with the amount you want to pay for the token
                const transaction = await contract.connect(signer).buyAToken({ value: valueInWei, gasLimit: 300000});
                console.log(transaction);

                // Wait for the transaction to be mined
                await transaction.wait();

                console.log('Token bought successfully!');
            } else {
                console.error('Web3 provider not found');
            }
        } catch (error) {
            console.error('Error buying token:', error.message);
        }
    };



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

    return (
        <div>
            <h1>Fake Nefturians</h1>
            <button onClick={connect}>Connect</button>
            <p>Connection Status: {connectionStatus}</p>
            <p>Minimum Token Price: {minTokenPrice} ETH</p>
            <button onClick={handleBuyToken}>Buy Token</button>
        </div>
    );
}

export default FakeNefturians;
