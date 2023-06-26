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



function Transactions({ id }) {
  const [blockTxs, setBlockTxs] = useState('')

  //string to nº
  const idn = parseInt(id);

  async function getBlockTxs() {
    const allBlockTxs = await alchemy.core.getBlockWithTransactions(idn)
    /* console.log('AllBlocksTxs '+ allBlockTxs.transactions[2].transactionIndex) */
    /* const firstTransaction = allBlockTxs.transactions[0].hash */

    /* Get last 5 txs */
    const lastFiveTxs = allBlockTxs.transactions.slice(0, 5)
    setBlockTxs(lastFiveTxs)
  }

  useEffect(() => {
    getBlockTxs()
  }, [])



  return (
    <div>
      <p>Last five transactions:</p>

      <div class=" flex flex-row  flex-wrap md:my-6">


        {blockTxs && blockTxs.map((e) => {
          return (

            <div class=" flex flex-col py-1 px-3 mx-4 whitespace-normal max-w-min mx-auto bg-yellow-300  drop-shadow-xl inline-block border-2 border-current  text-sm space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6  " key={e.hash}>


              <label for="hashSelect" class="  border-2 border-current px-2 py-1 mb-3 text-sm font-bold uppercase tracking-widest " style={{ textShadow: "-1px -1px blue" }}>tx nº {e.transactionIndex + 1} hash</label><select id="hashSelect" class=" w-40 mx-auto  " placeholder="hola">
                <option value="block's first tx" >{e.hash}</option>
              </select>
            </div>
          )
        })}


        {/* 
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
                        <tr key={e.hash}
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
        </div> */}
      </div>







    </div >
  )
}

export default Transactions