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

function Block({ blockNumber, getBlockNumber }) {
  const [lastBlock, setLastBlock] = useState('')


  const handleOnLastBlock = () => {
    getBlockNumber()

  }

  return (


    <div class="flex justify-center flex-col flex-wrap place-items-center space-y-2 bg-green-100 " >

      <div class="font-semibold rounded-full  hover:text-green-500 "    > 
        <NavLink to={`block/${blockNumber}`}> <p>#{blockNumber} </p></NavLink>
      </div>
      <div class=' bg-yellow-100 '>
        <button onClick={handleOnLastBlock} type="submit" class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"> Get last block</button>
      </div>
    </div>
  )
}

export default Block