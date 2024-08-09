import { Blockchain } from "./blockchain";
import { ec as EC } from "elliptic";
import * as fs from "fs";
import * as path from "path";

const ec = new EC("secp256k1");

export class Tools {
  public static generateKeyPair(): any {
    const keyPair = ec.genKeyPair();
    const privateKey = keyPair.getPrivate("hex");
    const publicKey = keyPair.getPublic("hex");

    return { keyPair, privateKey, publicKey };
  }

  public static restoreWallet(privateKey: string): any {
    const keyPair = ec.keyFromPrivate(privateKey, "hex");
    const publicKey = keyPair.getPublic().encode("hex", false);

    return { keyPair, publicKey };
  }

  public static restoreBlockchain(): Blockchain {
    const filePath = path.join(__dirname, "/blockchain.txt");

    try {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      if (data.length == 0) {
        return new Blockchain();
      } else {
        const blockchain = new Blockchain();
        blockchain.transactions = data.transactions;
        blockchain.blockchain = data.blockchain;

        return blockchain;
      }
    } catch (error) {
      return new Blockchain();
    }
  }
}
