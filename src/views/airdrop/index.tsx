import React, {FC, useEffect, useCallback} from "react";
import useUSerSOLBalanceStore from "../../stores/useUserSOLBalanceStore";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, Transaction, TransactionSignature } from "@solana/web3.js";
import { notify } from "utils/notifications";
import {AiOutlineClose} from "react-icons/ai";

//INTERNAL IMPORT
import Branding from "../../components/Branding";





export const AirdropView: FC = ({setOpenAirdrop}) => {
  const wallet = useWallet();
  const {connection} = useConnection();
  const {publicKey,} = useWallet();

  const balance = useUSerSOLBalanceStore((s)=> s.balance);
  const {getUserSOLBalance} = useUSerSOLBalanceStore();

  useEffect(()=> {
    if(wallet.publicKey){
      getUserSOLBalance(wallet.publicKey, connection);
    }
  }, [wallet.publicKey, connection, getUserSOLBalance]);

  const onClick = useCallback(async()=> {
    if(!publicKey){
      notify({
        type: "error",
        message: "Sorry error",
        description: "wallet not connected",
      });
      return;
    }
    let signature:  TransactionSignature = "";

    try {
      signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
      notify({
        type: "successr",
        message: "You have successufully claimed 1 Airdrod",
        txid: signature,
      });

      const latestBlockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash: latestBlockHash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature,
      });

      getUserSOLBalance(publicKey, connection);

      
    } catch (error: any) {
      notify({
        type: "error",
        message: "Airdrop failed",
        description: error?.message,
        txid: signature,
      });
      console.log("error", `Airdrop Failed ${error?.message}`, signature);
      
    }
  }, [publicKey, connection, getUserSOLBalance]);

  
//COMPONET
 const CloseModal = ()=> (
  <a onClick={()=> setOpenAirdrop(false)} className="group mt-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-2xl transition-all duration-500 hover:bg-blue-600/60">
    <i className="text-2xl text-white group-hover:text-white">
      <AiOutlineClose/>
    </i>
  </a>
); 


  return ( 
  <>

 
  <section className="flex w-full items-center py-6 px-0 lg:h-screen">
    <div className="container">
      <div className="bg-default-950/40 mx-auto max-w-5xl
       overflow-hidden rounded-2xl backdrop-blur-xl">
        <div className="grid gap-10 lg:grid-cols-2">
        {/*//FIRST*/}   
        < Branding image="img-14" 
        title=" To Bulid Solana Blockchain Market" 
        massege="Solana market place"/>
         {/*//SECOND*/} 
       
            <div className="lg:ps-0 flex h-full flex-col p-10">
            <div className="pb-10 ">
              <a className="flex">
                <img src="assets/images/logo1.png" alt="logo" className="h-10"/>
              </a>
            </div>
            <div className="my-auto p-6 text-center">
              <h4 className="mb-4 text-2xl font-bold text-white">
              
               {
                wallet && (
                  <p>SOL BALANCE: {(balance || 0).toLocaleString()}</p>
                )
              }
              </h4>
              
              <p className="text-default-300 mx-auto mb-5 max-w-sm">
                Now you can claim your 1 Airdrop
              </p>
             
            <div className="flex items-start justify-center">
              <img src="assets/images/logout.svg" alt="" className="h-40" />
            </div>
               
               
              <div className="mb-6 text-center">
                <button 
                onClick={onClick}
                disabled={!publicKey} 
                className="bg-primary-600/90 hover:bg-primary-600 group mt-5 inline-flex w-full 
                items-center justify-center rounded-lg px-6 py-2 text-white 
                backdrop-blur-2xl transition-all duration-500">
                  <span className="fw-bold">Airdrop </span>
                </button>
                <CloseModal/>
              </div>
      
            </div>
          </div>

         
       
        </div>
      
      </div>
    </div>
  </section>



  </>
  )
    
};

