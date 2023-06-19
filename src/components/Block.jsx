import React from 'react'
import '../index.css'
import { Alchemy, Network } from "alchemy-sdk";
import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import BlockInfo from '../Pages/BlockInfo';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Block({ blockNumber , getBlockNumber}) {
  const [lastBlock , setLastBlock] = useState('')


 const handleOnLastBlock = () =>{
  getBlockNumber()
  
 }

  return (
    <div >
      <button onClick={handleOnLastBlock} type="submit" class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"> Search for last block</button>
      
     
      <NavLink to={`block/${blockNumber}`}> <p>LAST BLOCK #{blockNumber} </p></NavLink>

    </div>
  )
}

export default Block