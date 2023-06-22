import { Alchemy, Network } from "alchemy-sdk";
/* import { providers } from "ethers"; */
import '../App.css'
import { useEffect, useState } from "react";
import { Utils } from "alchemy-sdk";
import { NavLink } from 'react-router-dom'
import Block from "./Block";
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

            setBlockWithTxs(blockTxs.transactions[0].hash)
            /*  console.log("blockTxs", blockTxs.transactions[0].hash , "blockNumber" , blockTxs.transactions[0].blockNumber) */
        } catch (err) {
            console.log(err)
        }


    }

    useEffect(() => {

        getBlockNumber();
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



    }, [blockWithTxs, blockNumber]);//


    const handleOnSearchBlock = async (e) => {

        e.preventDefault()
        const blockToSearch = e.target.elements.inputSearchBlock.value;

        //string to number
        const number = parseInt(blockToSearch, 10);
        try {
            const blockSearched = await alchemy.core.getBlockWithTransactions(number);
            setSearch(blockSearched.transactions.slice(0, 1))
            console.log(search)
            //first transaction
        } catch (err) {
            console.log(err)
        }
        setShowSearchResult(true);
        setShowBlockWithTxs(false);

    }

    /* console.log(search) */

    return (
        <div className="App  min-h-screen from-cyan-100 via-pink-200 to-yellow-200 bg-gradient-to-br">

            <div className="h-full flex justify-center items-center">
                <h1 className="text-black text-4xl font-bold uppercase relative inline-block">
                    <span id="before-te1" className="absolute top-0 left-0.5 w-full h-full bg-transparent" style={{ textShadow: "-2px 0 #49FC00", clipPath: "rect(24px, 550px, 90px, 0)" }} aria-hidden="true">Block scanner</span> {/* glitch::before */}
                    block scanner
                    <span id="after-te1" className="absolute top-0 -left-0.5 w-full h-full bg-transparent" style={{ textShadow: "-2px 0 spin(#49FC00, 180)", clipPath: "rect(85px, 550px, 140px, 0)" }} aria-hidden="true">Block Scanner</span> {/* glitch::after */}
                </h1>
            </div>


            <div class="flex flex-row justify-end bg-red-100  px-8 py-8 "  >

                <form class="space-x-3 " onSubmit={(e) => handleOnSearchBlock(e)} >
                    <input class="inline-block focus:outline-none focus:ring  border-2 border-current  text-center " name="inputSearchBlock" type="text" placeholder="search a block number"></input>


                    <button
                        class="group relative inline-block focus:outline-none focus:ring"
                    >
                        <span
                            class="absolute inset-0 translate-x-0 translate-y-0 bg-yellow-300 transition-transform group-hover:translate-y-1.5 group-hover:translate-x-1.5"
                        ></span>

                        <span
                            class="relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest"
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



            {/*                     <img class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src="/img/erin-lindford.jpg" alt="Woman's Face" /> */}







            {showSearchResult ? (search.length ? (search.map((e) => (

                <div class=" flex flex-col py-8 px-8 whitespace-normal max-w-min mx-auto bg-yellow-300  drop-shadow-xl inline-block border-2 border-current px-8 py-3 text-smspace-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6  overflow-hidden cursor-pointer animate-fade-down animate-once animate-duration-300 animate-ease-in" key={e.hash}>
                    <p class="text-lg text-black font-semibold">Block #{e.blockNumber}</p>
                    <label for="hashSelect">Block's first tx hash</label>
                    <select id="hashSelect" class="   w-40 mx-auto  " placeholder="hola" >
                        <option value="block's first tx"  >{e.hash}</option>
                    </select>
                    <div class="flex flex-col text-center space-y-1">

                        <p class="text-lg text-black font-semibold">From:</p>
                        <p class='mb-4 font-light hover:animate-fade animate-once '>{e.from} </p>
                        <p class="text-lg text-black font-semibold ">To:</p>
                        <p class='mb-4 font-light hover:animate-fade animate-once'>{e.to}</p>
                    </div>
                </div>
            ))
            ) : (<div>Block not found</div>))
                : (<div>
                    {/*                     <button onClick={()=>{ getBlockTxs(); setShowSearchResult(false);}}>Show last Block with Transactions</button> */}
                    {showBlockWithTxs && (
                        <div>
                            first transactions of the block (hash): {blockWithTxs}
                        </div>

                    )}
                </div>
                )}

            {/*             {showBlockWithTxs && (
                <div>
                    first transactions of the block (hash): {blockWithTxs}
                </div>
            )}
 */}

        </div>
    );
}
export default Home