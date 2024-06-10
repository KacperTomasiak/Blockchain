import { ec as EC } from "elliptic";

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
}
