import { Alchemy, Network } from "alchemy-sdk";
/* import { providers } from "ethers"; */

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
    }, [blockNumber, blockWithTxs]);//


    const handleOnSearchBlock = async (e) => {
        e.preventDefault()
        const blockToSearch = e.target.elements.inputSearchBlock.value;

        //string to number
        const number = parseInt(blockToSearch, 10);
    
        const blockSearched = await alchemy.core.getBlockWithTransactions(number);
        console.log(blockSearched)
    }

    return (
        <div>
            <div className="App">Block Number: {blockNumber}</div>;

            <form onSubmit={(e) => handleOnSearchBlock(e)} >
                <input name="inputSearchBlock" type="text" placeholder="search a block number"></input>
                <button type="submit"> Search by block number</button>
            </form>
            <div>
                <Block blockNumber={blockNumber}></Block>
            </div>

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