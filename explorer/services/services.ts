import { Blockchain, Transaction } from "../../blockchain/blockchain";
import { Tools } from "../../blockchain/tools";

export const getBlockchain = (): any => {
  let blockchainCopy: Blockchain = Tools.restoreBlockchain();

  return blockchainCopy;
};

export const getBlock = (arg: string): any => {
  let blockchainCopy: Blockchain = Tools.restoreBlockchain();

  if (/[abcdef]/.test(arg)) {
    for (let i: number = 0; i < blockchainCopy.blockchain.length; i++) {
      if (blockchainCopy.blockchain[i].blockHash == arg) {
        return blockchainCopy.blockchain[i];
      }
    }
  } else {
    return blockchainCopy.blockchain[parseInt(arg)];
  }

  return {};
};

export const getTransaction = (arg: string): any => {
  let blockchainCopy: Blockchain = Tools.restoreBlockchain();

  for (let i: number = 0; i < blockchainCopy.blockchain.length; i++) {
    for (
      let j: number = 0;
      j < blockchainCopy.blockchain[i].transactions.length;
      j++
    ) {
      const txid = blockchainCopy.blockchain[i].transactions[j].txid;
      if (txid == arg) {
        return blockchainCopy.blockchain[i].transactions[j];
      }
    }
  }

  return {};
};

export const getAddressTransactions = (arg: string): any => {
  let blockchainCopy: Blockchain = Tools.restoreBlockchain();
  let transactions: Transaction[] = [];

  for (let i: number = 0; i < blockchainCopy.blockchain.length; i++) {
    for (
      let j: number = 0;
      j < blockchainCopy.blockchain[i].transactions.length;
      j++
    ) {
      if (blockchainCopy.blockchain[i].transactions[j].destination == arg) {
        transactions.push(blockchainCopy.blockchain[i].transactions[j]);
      }
    }
  }

  return transactions;
};
