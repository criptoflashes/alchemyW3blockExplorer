import React from 'react'
import { Alchemy, Network } from "alchemy-sdk";
import { useParams } from 'react-router-dom'
import Transactions from '../components/Transactions';



const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const BlockInfo = () => {


    const { id, blockNumber } = useParams();
    const refresh = () => {
        window.location.reload();
        console.log(id)
    };



    return (
        <div>

            <p>blockkk # {id} </p>
            <Transactions blockNumber={blockNumber}> transactioons</Transactions>
           
        </div>
    )
}

export default BlockInfo