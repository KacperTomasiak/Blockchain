import { Blockchain, Transaction } from "./blockchain";
import { Tools } from "./tools";
import { Message } from "./message";

export class Wallet {
  public keyPair: any;
  public publicKey: string;
  public privateKey: string;
  public balance: number;

  constructor() {
    const { keyPair, privateKey, publicKey } = Tools.generateKeyPair();
    this.keyPair = keyPair;
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  public displayInformation(): void {
    console.log(`Private key: ${this.privateKey}`);
    console.log(`Public key: ${this.publicKey}`);
  }

  public transfer(amount: number, recipient: string): void {
    if (this.balance >= amount) {
      const signature = this.keyPair.sign(amount, recipient);
      const isValid = this.keyPair.verify(amount, recipient, signature);

      if (isValid) {
        const transaction = new Transaction(
          "transfer",
          this.publicKey,
          recipient,
          amount,
          []
        );
        Blockchain.addToQueue(transaction);
      }
    }
  }

  public sendMessage(message: Message, destination: string): void {
    const signature = this.keyPair.sign(message.text);
    const isValid = this.keyPair.verify(message.text, signature);

    if (isValid) {
      const transaction = new Transaction(
        "message",
        this.publicKey,
        destination,
        0,
        [{ message: message.encryptMessage(destination) }]
      );
      Blockchain.addToQueue(transaction);
    }
  }

  public sign(appName: string): void {
    const signature = this.keyPair.sign(appName);
    const isValid = this.keyPair.verify(appName, signature);

    if (isValid) {
      const transaction = new Transaction(
        "sign",
        this.publicKey,
        this.publicKey,
        0,
        [{ app: appName }]
      );
      Blockchain.addToQueue(transaction);
    }
  }

  public revoke(appName: string): void {
    const signature = this.keyPair.sign(appName);
    const isValid = this.keyPair.verify(appName, signature);

    if (isValid) {
      const transaction = new Transaction(
        "revoke",
        this.publicKey,
        this.publicKey,
        0,
        [{ app: appName }]
      );
      Blockchain.addToQueue(transaction);
    }
  }
}
