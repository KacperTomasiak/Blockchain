import * as crypto from "crypto";

export class Transaction {
  constructor(
    public type: string,
    public origin: string,
    public destination: string,
    public amount: number,
    public additionalData: any[] = [],
    public txid?: string
  ) {
    const str = JSON.stringify(this);
    const hash = crypto.createHash("SHA256");
    hash.update(str).end();
    this.txid = hash.digest("hex");
  }
}

export class Block {
  constructor(
    public nonce: number = 0,
    public previousHash: string,
    public transactions: Transaction[],
    public timestamp = Date.now(),
    public blockHash?: string
  ) {
    const str = JSON.stringify(this);
    const hash = crypto.createHash("SHA256");
    hash.update(str).end();
    this.blockHash = hash.digest("hex");
  }
}

export class Blockchain {
  transactions: Transaction[] = [];
  blockchain: Block[] = [];

  get chain() {
    return this.blockchain;
  }

  get lastBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }

  public addToQueue(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  public clearQueue(): void {
    this.transactions = [];
  }

  public addBlock(): void {
    const verifier = crypto.createVerify("SHA256");
    verifier.update(this.transactions.toString());
    const previousHash =
      this.blockchain.length > 0 ? this.lastBlock.blockHash : "";
    const nonce = this.blockchain.length > 0 ? this.lastBlock.nonce + 1 : 0;
    const newBlock = new Block(nonce, previousHash, this.transactions);
    this.verify(newBlock.nonce);
    this.blockchain.push(newBlock);
    this.clearQueue();
  }

  public verify(nonce: number): number {
    let solution = Math.floor(Math.random() * 10);

    while (true) {
      const hash = crypto.createHash("SHA256");
      hash.update((nonce + solution).toString()).end();
      const attempt = hash.digest("hex");

      if (attempt.substring(0, 4) === "0000") {
        return solution;
      }

      solution += 1;
    }
  }
}
