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

 

  return (
    <div> Last five transactions: {/* {blockTxs} */}

{/*       {blockTxs && blockTxs.map((e) => {
        return (
          <div key= {e.hash}>
            <p>Tx hash: {e.hash}</p>
            <p>Tx from: {e.from}</p>
            <p>Tx to: {e.to}</p>
            <br></br>
          </div>
        )
      })} */}
      

<div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b font-medium dark:border-neutral-500">
          
       
          <tr class=" text-center">
          <th scope="col">Tx Index</th>
            <th scope="col">Tx hash</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            </tr>
         
          </thead>
          <tbody>
          {blockTxs && blockTxs.map((e) => {
        return (
            <tr key= {e.hash}
              class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                <td class="whitespace-nowrap px-6 py-4">{e.transactionIndex}</td>
              <td class="whitespace-nowrap px-6 py-4 font-medium">{e.hash}</td>
              <td class="whitespace-nowrap px-6 py-4">{e.from}</td>
              <td class="whitespace-nowrap px-6 py-4">{e.to}</td>
              
            </tr>
                 )
                })}


          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>







    </div>
  )
}

export default Transactions