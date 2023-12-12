import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using react-router-dom
import { abi, contractAddress } from "./fakeNefturiansContract.js";
import { ethers } from 'ethers';

function UserTokensPage() {
    const { userAddress } = useParams();
    const [userTokens, setUserTokens] = useState([]);

    useEffect(() => {
        const fetchUserTokens = async () => {
            try {
                if (typeof window.ethereum !== 'undefined') {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const contract = new ethers.Contract(contractAddress, abi, provider);

                    // Fetch the token IDs owned by the user
                    const tokenIds = await contract.tokensOfOwner(userAddress);

                    // Fetch metadata for each token ID
                    const tokensWithData = await Promise.all(
                        tokenIds.map(async (tokenId) => {
                            const tokenMetadata = await contract.getTokenMetadata(tokenId);
                            return {
                                tokenId,
                                name: tokenMetadata.name,
                                description: tokenMetadata.description,
                            };
                        })
                    );

                    setUserTokens(tokensWithData);
                } else {
                    console.error('Web3 provider not found');
                }
            } catch (error) {
                console.error('Error fetching user tokens:', error.message);
            }
        };

        fetchUserTokens();
    }, [userAddress]);

    return (
        <div>
            <h1>User Tokens - {userAddress}</h1>
            <ul>
                {userTokens.map((token) => (
                    <li key={token.tokenId}>
                        <p>NFT ID: {token.tokenId}</p>
                        <p>Name: {token.name}</p>
                        <p>Description: {token.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserTokensPage;
