import React, { useEffect, useState } from 'react';
import { abi, contractAddress } from "./fakeNefturiansContract.js";
import { ethers } from 'ethers'; // Import ethers library

function FakeNefturians() {
    const [minTokenPrice, setMinTokenPrice] = useState(0);

    useEffect(() => {
        const fetchMinTokenPrice = async () => {
            try {
                if (typeof window.ethereum !== 'undefined') {
                    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any'); // Specify the network here ('any' for any network)
                    const contract = new ethers.Contract(contractAddress, abi, provider);

                    // Call the contract function to get the minimum token price
                    const minPrice = await contract.tokenPrice();
                    setMinTokenPrice(minPrice.toNumber());
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
                const provider = new ethers.providers.Web3Provider(window.ethereum, 'any'); // Specify the network here
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, abi, signer);

                // Replace 'value' with the amount you want to pay for the token
                const transaction = await contract.buyAToken({ value: ethers.utils.parseEther('0.1') });

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

    return (
        <div>
            <h1>Fake Nefturians</h1>
            <p>Minimum Token Price: {minTokenPrice} ETH</p>
            <button onClick={handleBuyToken}>Buy Token</button>
        </div>
    );
}

export default FakeNefturians;
