import React from 'react'
import { Alchemy, Network } from "alchemy-sdk";
import { useParams } from 'react-router-dom'
import Transactions from '../components/Transactions';
import blockBg2 from '../img/blockBg2.svg'
import { NavLink } from 'react-router-dom';
import {useEffect} from 'react'

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

    useEffect(() => {

        let style1 = document.createElement("style")
        let style2 = document.createElement("style")
        let after = document.getElementById("after-te1")
        let before = document.getElementById("before-te1")
        const setKeyframesRules = (n, start = 0) => {
          let steps = ""
          for (let i = start; i <= n; i++) {
            let percent = (i / n) * 100
            let random1 = `${Math.random()*150}px`
            let random2 = `${Math.random()*150}px`
            steps = steps.concat(`${percent}% { clip: rect(${random1}, 9999px, ${random2}, 0) } `)
          }
          return steps
        }
        let keyframes1 = `@keyframes glitch-anim-1 { ${setKeyframesRules(24)} }`
        let keyframes2 = `@keyframes glitch-anim-2 { ${setKeyframesRules(32, 2)} }`
        style1.innerHTML = keyframes1
        style2.innerHTML = keyframes2
        after.appendChild(style1)
        before.appendChild(style2)
        after.style.animation = "glitch-anim-1 2.5s infinite linear alternate-reverse"
        before.style.animation = "glitch-anim-2 3s infinite linear alternate-reverse"
        


    }, []);//

    return (
        <div className="flex flex-col items-center bg-green-300  h-screen bg-cover bg-no-repeat  "  style={{ /* height: '100%' */ backgroundImage: `url(${blockBg2})` }} >

<div className="flex self-start ml-4 ">

<NavLink to={'/'}> 

<div className=" flex justify-center items-center mt-5 mb-8 py-4">
      <h1 className="text-black text-4xl font-londrina uppercase relative inline-block">
        <span id="before-te1" className="absolute -top-5 left-0.9 w-full h-full bg-purple-200" style={{ textShadow: "-10px -4 yellow", clipPath: "rect(24px, 550px, 90px, 0)" }} aria-hidden="true">  ◀ ❐ Home ✰ ►    </span> {/* glitch::before */}
        ◀ ❐ Home ✰ ► 
        <span id="after-te1" className="absolute top-1 -left-0.5 w-full h-full bg-yellow-400" style={{ textShadow: "-30px -5 spin(purple-500, 180)", clipPath: "rect(85px, 550px, 140px, 0)" }} aria-hidden="true"> ◀ ❐ Home ✰ ►   </span> {/* glitch::after */}
      </h1>
    </div>


</NavLink>
 </div>

            <p className="font-bold text-5xl mt-20  text-yellow-900 " style={{ textShadow: "-3px -3px yellow" }}>Block #{id} last five tx's  </p>
            
            <Transactions id={id}/>
           
        </div>
    )
}

export default BlockInfo