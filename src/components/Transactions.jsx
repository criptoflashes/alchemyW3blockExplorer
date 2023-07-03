import React, { useEffect, useState, useRef } from "react";
import { Alchemy, Network } from "alchemy-sdk";
import "animate.css";
import s from './tx.module.css'

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function Transactions({ id }) {
  const [blockTxs, setBlockTxs] = useState("");
  const cardRefs = useRef([]);

  const idn = parseInt(id);

  async function getBlockTxs() {
    const allBlockTxs = await alchemy.core.getBlockWithTransactions(idn);
    const lastFiveTxs = allBlockTxs.transactions.slice(0, 5);
    setBlockTxs(lastFiveTxs);
  }

  useEffect(() => {
    getBlockTxs();
  }, []);

 
  return (
 
    
      <div className={"flex flex-col mt-10 items-center" }>
        {blockTxs &&
          blockTxs.map((e, index) => (
            <div

              className={`${s.slideTop}  py-5 px-3 absolute top-${index + 9} whitespace-normal max-w-min mx-auto bg-yellow-300 drop-shadow-xl border-2 border-current text-sm space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 my-10`}
              style={{ zIndex: index, marginTop: `${index * 40}px` }} 
              key={e.hash}
            >
              <label
                htmlFor="hashSelect"
                className="border-2 border-current px-2 py-1 mb-3 text-sm font-bold uppercase tracking-widest"
                style={{ textShadow: "-1px -1px blue" }}
              >
                tx nº {e.transactionIndex + 1} hash
              </label>
              <select
                id="hashSelect"
                className="w-40 mx-auto"
                placeholder="hola"
              >
                <option value="block's first tx">{e.hash}</option>
              </select>
            </div>
          ))}
      </div>
 
  );
}

export default Transactions;
