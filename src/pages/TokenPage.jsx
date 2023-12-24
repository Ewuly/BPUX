import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { abi, contractAddress } from "./fakeBaycContract.js";
import { ethers } from 'ethers'; // Import ethers library


function TokenPage() {
    // const { tokenId } = useParams();
    // const [tokenData, setTokenData] = useState(null);
    // const [imageURL, setImageURL] = useState('');

    const { tokenId } = useParams();
    const [metadata, setMetadata] = useState(null);
    const [error, setError] = useState(null);

    const convertIpfsUrl = (url) => {
        return url.replace(/^ipfs:\/\//, "https://ipfs.io/ipfs/");
    };
    useEffect(() => {
        const fetchMetadata = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, abi, provider);

            try {
                const tokenUri = await contract.tokenURI(tokenId);
                const response = await fetch(tokenUri);
                const metadata = await response.json();
                setMetadata(metadata);
            } catch (error) {
                setError("Error fetching token metadata");
                console.error("Error fetching token metadata:", error);
            }
        };

        fetchMetadata();
    }, [tokenId]);

    // useEffect(() => {
    //     const fetchTokenData = async () => {
    //         try {
    //             if (typeof window.ethereum !== "undefined") {
    //                 const provider = new ethers.providers.Web3Provider(window.ethereum);
    //                 const signer = provider.getSigner();
    //                 const contract = new ethers.Contract(contractAddress, abi, signer);

    //                 await window.ethereum.request({ method: 'eth_requestAccounts' });
    //                 console.log('Ethereum provider is connected');

    //                 console.log("contractAddress");

    //                 const tokenUri = await contract.tokenURI(tokenId);
    //                 const response = await fetch(tokenUri);
    //                 const data = await response.json();
    //                 const image = data.image;
    //                 const metadata = { image, attributes: data.attributes };
    //                 const attributes = data.attributes;

    //                 setTokenData(data);

    //                 const cid = data.image.replace('ipfs://', '');
    //                 const ipfsGatewayURL = `https://ipfs.io/ipfs/${cid}`;
    //                 setImageURL(ipfsGatewayURL);
    //             } else {
    //                 console.error('Web3 provider not found');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching token data:', error.message);
    //         }
    //     };
    //     fetchTokenData();
    // }, [tokenId]);

    // if (!tokenData) {
    //     return (
    //         <div>
    //             <h1>Token {tokenId}</h1>
    //             <h1>TOKEN DOES NOT EXIST</h1>
    //             <h1>THIS IS A CLEAN ERROR MESSAGE</h1>
    //         </div>
    //     );
    // }



    return (
        <>
            {/* <div>
                <h1>Token {tokenId}</h1>
                <img src={imageURL} alt={`Token ${tokenId}`} style={{ maxWidth: '400px', maxHeight: '400px' }} />
                <div>
                    {tokenData.attributes.map((attribute, index) => (
                        <div key={index}>
                            {attribute.trait_type}: {attribute.value}
                        </div>
                    ))}
                </div>
            </div> */}
            <div>
                {error ? (
                    <p>Error: {error}</p> // Display error message
                ) : metadata ? (
                    <>
                        <img src={convertIpfsUrl(metadata.image)} alt={`Token ${tokenId}`} />
                        <p>Attributes :</p>
                        <ul>
                            {metadata.attributes.map((attribute, index) => (
                                <li key={index}>{`${attribute.trait_type}: ${attribute.value}`}</li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div>
                <Link to="/">Page Principale</Link>
            </div>
        </>
    );
}

export default TokenPage;
