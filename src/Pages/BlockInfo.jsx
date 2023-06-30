import React from 'react'
import { Alchemy, Network } from "alchemy-sdk";
import { useParams } from 'react-router-dom'
import Transactions from '../components/Transactions';
import blockBg from '../img/blockBg.svg'



const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const BlockInfo = ({ blockNumber }) => {

    const params = useParams()

    const { id } = useParams();
    console.log("useParams", params)
    const refresh = () => {
        window.location.reload();

    };

    console.log(id)

    return (
        <div class="myClaAA flex flex-col  bg-green-300  h-screen items-center bg-cover bg-no-repeat "  style={{ /* height: '100%' */ backgroundImage: `url(${blockBg})` }} >

            <p class="font-light text-4xl tracking-tight mt-40 "  style={{ textShadow: "-1px -1px cyan" }}>BLOCK # {id} </p>
            <Transactions id={id}> transactioons</Transactions>

        </div>
    )
}

export default BlockInfo