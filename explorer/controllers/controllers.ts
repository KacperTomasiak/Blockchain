import {
  getAddressTransactions,
  getBlock,
  getBlockchain,
  getTransaction,
} from "../services/services";
import { Block, Blockchain, Transaction } from "../../blockchain/blockchain";
import { Wallet } from "../../blockchain/wallet";
import { Tools } from "../../blockchain/tools";

export const createKeysController = (req, res): void => {
  const wallet = new Wallet();
  res.send({ privateKey: wallet.privateKey, publicKey: wallet.publicKey });
};

export const recoverKeysController = (req, res): void => {
  const privateKey: string = req.params.key;
  const { keyPair, publicKey } = Tools.restoreWallet(privateKey);
  res.send({ privateKey: privateKey, publicKey: publicKey });
};

export const transactionController = (req, res): void => {
  const arg: string = req.params.transaction;
  const transaction: Transaction = getTransaction(arg);
  res.send(transaction);
};

export const blockController = (req, res): void => {
  const arg: string = req.params.block;
  const block: Block = getBlock(arg);
  res.send(block);
};

export const blockchainController = (req, res): void => {
  const blockchain: Blockchain = getBlockchain();
  res.send(blockchain);
};

export const addressController = (req, res): void => {
  const address: string = req.params.address;
  const transactions: Transaction[] = getAddressTransactions(address);
  res.send(transactions);
};
