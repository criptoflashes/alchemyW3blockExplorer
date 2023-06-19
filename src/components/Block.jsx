import React from 'react'
import { Alchemy, Network } from "alchemy-sdk";
import { Outlet, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import BlockInfo from '../Pages/BlockInfo';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Block({ blockNumber }) {



  return (
    <div>

      <NavLink to={`block/${blockNumber}`}> <p>BLOCK #{blockNumber} </p></NavLink>

    </div>
  )
}

export default Block