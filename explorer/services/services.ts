import { Blockchain, Transaction } from "../../blockchain/blockchain";
import { blockchain } from "../../blockchain/main";

export const getBlockchain = (): Blockchain => {
  return blockchain;
};

export const getBlock = (arg: string): any => {
  if (/[abcdef]/.test(arg)) {
    for (let i: number = 0; i < blockchain.blockchain.length; i++) {
      if (blockchain.blockchain[i].blockHash == arg) {
        return blockchain.blockchain[i];
      }
    }
  } else {
    return blockchain.blockchain[parseInt(arg)];
  }

  return {};
};

export const getTransaction = (arg: string): any => {
  for (let i: number = 0; i < blockchain.blockchain.length; i++) {
    for (
      let j: number = 0;
      j < blockchain.blockchain[i].transactions.length;
      j++
    ) {
      const txid = blockchain.blockchain[i].transactions[j].txid;
      if (txid == arg) {
        return blockchain.blockchain[i].transactions[j];
      }
    }
  }

  return {};
};

export const getAddressTransactions = (arg: string): any => {
  let transactions: Transaction[] = [];

  for (let i: number = 0; i < blockchain.blockchain.length; i++) {
    for (
      let j: number = 0;
      j < blockchain.blockchain[i].transactions.length;
      j++
    ) {
      if (blockchain.blockchain[i].transactions[j].destination == arg) {
        transactions.push(blockchain.blockchain[i].transactions[j]);
      }
    }
  }

  return transactions;
};
