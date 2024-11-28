import create, {State} from "zustand";
import {Connection, PublicKey, LAMPORTS_PER_SOL} from "@solana/web3.js";
import { set } from "immer/dist/internal";

interface UserSOLBalanceStore extends State {
  balance: number;
  getUserSOLBalance: (PublicKey: PublicKey, connection: Connection) => void;
}

const useUSerSOLBalanceStore = create<UserSOLBalanceStore>((set, _get)=> ({
  balance: 0,
  getUserSOLBalance: async (PublicKey, connection )=> {
    let balance = 0;

    try {
      balance = await connection.getBalance(PublicKey, "confirmed");
      balance= balance / LAMPORTS_PER_SOL;
      
    } catch (error) {
      console.log(error);
      
    }
    set((s) =>{
      s.balance = balance;
      console.log("Balance", balance);
    });
  },
}));


export default useUSerSOLBalanceStore;

