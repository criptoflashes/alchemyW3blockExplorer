import { Alchemy, Network } from "alchemy-sdk";
import '../App.css'
import { useEffect, useState } from "react";
import { Utils } from "alchemy-sdk";
import Block from "./Block";
import githubIcon from "../img/github.svg"
import 'animate.css';
import s from './tx.module.css';
import { NavLink } from 'react-router-dom';




// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};


const alchemy = new Alchemy(settings);

function Home() {
    const [blockNumber, setBlockNumber] = useState();
    const [blockWithTxs, setBlockWithTxs] = useState([]);
    const [showBlockWithTxs, setShowBlockWithTxs] = useState(false)
    const [search, setSearch] = useState("")
    const [showSearchResult, setShowSearchResult] = useState(false);


    async function getBlockNumber() {
        try {
            const block = await alchemy.core.getBlockNumber();
            setBlockNumber(block)
                ;
        } catch (e) {
            console.log(e)
        }

        setShowBlockWithTxs(true);

    }

    async function getBlockTxs() {
        try {
            const blockTxs = await alchemy.core.getBlockWithTransactions(blockNumber);
            getBlockNumber()

            setBlockWithTxs(blockTxs/* .transactions[0].hash */)
            /*  console.log("blockTxs", blockTxs, "blockNumber", blockTxs.transactions[0].blockNumber)*/
        } catch (err) {
            console.log(err)
        }


    }

    useEffect(() => {

        getBlockTxs()
        let style1 = document.createElement("style")
        let style2 = document.createElement("style")
        let after = document.getElementById("after-te1")
        let before = document.getElementById("before-te1")
        const setKeyframesRules = (n, start = 0) => {
            let steps = ""
            for (let i = start; i <= n; i++) {
                let percent = (i / n) * 100
                let random1 = `${Math.random() * 150}px`
                let random2 = `${Math.random() * 150}px`
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



    }, [blockNumber]);//


    const handleOnSearchBlock = async (e) => {

        e.preventDefault()
        const blockToSearch = e.target.elements.inputSearchBlock.value;

        //string to number
        const number = parseInt(blockToSearch, 10);
        try {
            const blockSearched = await alchemy.core.getBlockWithTransactions(number);
            setSearch(blockSearched.transactions.slice(0, 1))
            /* console.log(search) */
            //first transaction
        } catch (err) {
            console.log(err)
        }
        setShowSearchResult(true);
        setShowBlockWithTxs(false);

    }

    /*   console.log("search", search)
      console.log('blockWithTxs', blockWithTxs) */



    const dataToRenderCard = showSearchResult ? search : showBlockWithTxs ? [blockWithTxs] : [];




    return (




        <div className={`${s.sectionTextV} flex flex-col items-center  absolute bg-green-300 `} /* style={{ backgroundImage: `url(${blockBg2})` }} */>






            <div className=" flex justify-center items-center mt-5 mb-8 py-4">
                <h1 className="text-black text-4xl font-londrina uppercase relative inline-block">
                    <span id="before-te1" className="absolute -top-5 left-0.9 w-full h-full bg-purple-200" style={{ textShadow: "-10px -4 yellow", clipPath: "rect(24px, 550px, 90px, 0)" }} aria-hidden="true">  ◀ ❐ Ethereum Block Scanner✰ ►  ◀ ❐ Ethereum Block Scanner✰ ►  </span> {/* glitch::before */}
                    ◀ ❐ Ethereum Block Scanner✰ ►  ◀ ❐ Ethereum Block Scanner✰ ►
                    <span id="after-te1" className="absolute top-1 -left-0.5 w-full h-full bg-yellow-400" style={{ textShadow: "-30px -5 spin(purple-500, 180)", clipPath: "rect(85px, 550px, 140px, 0)" }} aria-hidden="true"> ◀ ❐ Ethereum Block Scanner✰ ►  ◀ ❐ Ethereum Block Scanner✰ ►  </span> {/* glitch::after */}
                </h1>
            </div>




            <div className="h-full w-full">


                <div className="flex flex-row justify-end   px-8  "  >

                    <form className="space-x-3 " onSubmit={(e) => handleOnSearchBlock(e)} >
                        <input className="inline-block focus:outline-none focus:ring  border-2 border-current px-3 text-center  relative  " name="inputSearchBlock" type="text" placeholder="search a block number"></input>


                        <button className="group relative inline-block focus:outline-none focus:ring"
                        >
                            <span
                                className="absolute inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-y-1.5 group-hover:translate-x-1.5"
                            ></span>

                            <span
                                className="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest " style={{ textShadow: "-1px -1px blue" }}
                            >
                                search
                            </span>
                        </button>
                    </form>
                </div>


                {/* Get last block */}

                <div>
                    <Block blockNumber={blockNumber} getBlockNumber={getBlockNumber} showSearchResult={showSearchResult} setShowSearchResult={setShowSearchResult} showBlockWithTxs={showBlockWithTxs}></Block>
                </div>

                <br></br>






                {dataToRenderCard?.map((e) => (

                    <div className=" flex flex-col whitespace-normal max-w-min mx-auto bg-yellow-300  drop-shadow-xl inline-block border-2 border-current px-8 my-3 text-smspace-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm6 pace-x-6  overflow-hidden cursor-pointer animate__animated animate__bounceInUp " key={e.hash}>



                        {dataToRenderCard === search ? (

                            <>
                                <p className=" my-3 text-lg font-bold uppercase tracking-widest " style={{ textShadow: "-1px -1px blue" }}>Searched Block #{e.blockNumber}</p>
                                {/* <label >Block's first tx hash</label> */}<select id="hashSelect" className="w-40 mx-auto" placeholder="hola">
                                    <option value="block's first tx">{e.hash}</option>
                                </select>

                                <div className="flex flex-col text-center space-y-1">

                                    <p className="mt-3 text-sm font-bold uppercase tracking-widest " style={{ textShadow: "-1px -1px blue" }}>From:</p>
                                    <p className='mb-4 font-light hover:animate-fade animate-once '>{e.from} </p>
                                    <p className="  text-sm font-bold uppercase tracking-widest " style={{ textShadow: "-1px -1px blue" }}>To:</p>
                                    <p className='mb-4 font-light hover:animate-fade animate-once'>{e.to}</p>
                                    <div className="text-lg text-black font-semibold" >
                                    </div>
                                </div>
                            </>
                        ) : (

                            <div className="text-lg text-black font-semibold text-center mb-5" ><p className="  text-sm font-bold uppercase tracking-widest " style={{ textShadow: "-1px -1px blue" }} >Last block</p> <p> #{e.blockNumber} {e.number}</p>
                                <p className=" pt-3 mx-auto">Block's hash</p><select id="hashSelect" className="w-40 mx-auto  " placeholder="hola">
                                    <option value="block's first tx">{e.hash}</option>
                                </select><div className="flex flex-col text-center space-y-1">

                                    <div className="text-lg text-black font-semibold" >
                                        <p className=" px-8 pt-4 text-sm font-bold uppercase tracking-widest " style={{ textShadow: "-1px -1px blue" }}>Gas used </p>
                                        <p >{parseInt(e.gasUsed._hex) || "gas"}</p>  </div>
                                    <p className='mb-2 font-light hover:animate-fade animate-once '>{e.from} </p>
                                </div></div>
                        )}

                    </div>


                ))
                }
                {!dataToRenderCard && (<div>Block not found</div>)}
            </div>

            <div className="flex place-content-start z-10">

                <img src={githubIcon} alt="github icon" />
                <p>Design and development by <a href="https://github.com/criptoflashes">Mariana Maceira</a> </p>
            </div>


        </div>

    );
}
export default Home