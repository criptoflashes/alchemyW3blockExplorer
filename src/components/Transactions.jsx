import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Utils } from "alchemy-sdk";


// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


const alchemy = new Alchemy(settings);



function Transactions({ blockNumber }) {
  const [blockTxs, setBlockTxs] = useState('')

  async function getBlockTxs() {
    const allBlockTxs = await alchemy.core.getBlockWithTransactions(blockNumber)
    /*  console.log('AllBlocksTxs '+ allBlockTxs.transactions[0].hash) */
    /* const firstTransaction = allBlockTxs.transactions[0].hash */

    /* Get last 5 txs */
    const lastFiveTxs = allBlockTxs.transactions.slice(0, 5)

    setBlockTxs(lastFiveTxs)
  }

  useEffect(() => {
    getBlockTxs()
  }, [])

  /* console.log(blockTxs) */

  return (
    <div> Last five transactions: {/* {blockTxs} */}

      {blockTxs && blockTxs.map((e) => {
        return (
          <div key= {e.hash}>
            <p>Tx hash: {e.hash}</p>
            <p>Tx from: {e.from}</p>
            <p>Tx to: {e.from}</p>
            <br></br>
          </div>
        )
      })}
    </div>
  )
}

export default Transactions