import React from 'react'
import '../index.css'
import { Alchemy, Network } from "alchemy-sdk";
import { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { useRef } from 'react';
import 'animate.css';


const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const Block = ({ blockNumber, getBlockNumber, setShowSearchResult }) => {
  const numberDiv = document.querySelector('.numberDiv')
  const handleOnLastBlock = () => {
    getBlockNumber()
    setShowSearchResult(false)


    const buttonElement = buttonRef.current;
    buttonElement.classList.remove('animate__animated',  'animate__fadeInDown');
    buttonElement.style.setProperty('--animate-duration', '1.5s');
    void buttonElement.offsetWidth; // Reinicia la animación
  
    buttonElement.classList.add('animate__animated', 'animate__fadeInDown' );
    buttonElement.style.setProperty('--animate-duration', '1.5s');

    
}
const buttonRef = useRef(null);

return (


  <div class="flex justify-center flex-col flex-wrap place-items-center space-y-2 ">

    <div ref={buttonRef} class="font-light text-4xl tracking-tight  hover:font-bold  hover:tracking-widest " style={{ textShadow: "-1px -1px cyan" }}>
      <NavLink to={`block/${blockNumber}`}> <p>#{blockNumber} </p></NavLink>
    </div>

    <div class=' bg-yellow-100 '>
      <button onClick={handleOnLastBlock}
        class="group relative inline-block focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-y-1.5 group-hover:translate-x-1.5"
        ></span>
        <span
          class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest " style={{ textShadow: "-1px -1px blue" }}
        >
          Get last block
        </span>
      </button>
    </div>




  </div>
)
}

export default Block