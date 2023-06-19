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


    async function getBlockNumber() {
        try {
            const block = await alchemy.core.getBlockNumber();
            setBlockNumber(block)
        } catch (e) {
            console.log(e)
        }

    }

    async function getBlockTxs() {

        const blockTxs = await alchemy.core.getBlockWithTransactions(blockNumber);
        getBlockNumber()
        setShowBlockWithTxs(true);
        setBlockWithTxs(blockTxs.transactions[0].hash)
        /*  console.log("blockTxs", blockTxs.transactions[0].hash , "blockNumber" , blockTxs.transactions[0].blockNumber) */

    }

    useEffect(() => {

        getBlockNumber();
        getBlockTxs()
    }, []);//


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

    }

    /* console.log(search) */

    return (
        <div className="App">
            <div class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">Block Number: {blockNumber}</div>
            <div class="flex flex-row justify-end bg-red-100" >
                <form onSubmit={(e) => handleOnSearchBlock(e)} >
                    <input class="rounded text-pink-500" name="inputSearchBlock" type="text" placeholder="search a block number"></input>

                    <button type="submit" class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"> Search by block number</button>
                </form>
            </div>
            <div>
                <Block blockNumber={blockNumber} getBlockNumber={getBlockNumber}></Block>
            </div>

            <br></br>

            <div>
                <div class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
                    <img class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src="/img/erin-lindford.jpg" alt="Woman's Face" />
                    <div class="text-center space-y-2 sm:text-left">
                        <div class="space-y-0.5">
                            <p class="text-lg text-black font-semibold">
                                Erin Lindford
                            </p>
                            <p className=" App text-lg text-black font-semibold">Block Number: {blockNumber}</p>
                            <p class="text-slate-500 font-medium">
                                Product Engineer
                            </p>
                        </div>
                        <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">Message</button>
                    </div>
                </div>



                <br></br>

                {search && search.map((e) => {
                    return (
                        <div key={e.hash}>
                            <p>Block #: {e.blockNumber}</p>
                            <p>Block first tx:{e.hash}</p>
                            <p>From:{e.from} </p>
                            <p>To: {e.to}</p>
                        </div>
                    )
                })}

            </div>

            <br></br>

            <button onClick={getBlockTxs}>Show last Block with Transactions</button>
            {showBlockWithTxs && (
                <div>
                    first transactions of the block (hash): {blockWithTxs}

                </div>

            )}

        </div>
    );
}
export default Home