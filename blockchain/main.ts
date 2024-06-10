import { Blockchain } from "./blockchain";
import { Wallet } from "./wallet";
import { Message } from "./message";

export const blockchain = new Blockchain();

const wallets: Wallet[] = [
  new Wallet(),
  new Wallet(),
  new Wallet(),
  new Wallet(),
];

function generateRandomText(): string {
  const letters: string = "abcdefghijklmnopqrstuvwxyz";
  const length: number = 8;
  let text: string = "";

  for (let i: number = 0; i < length; i++) {
    const randomLetter: number = Math.floor(Math.random() * letters.length);
    text += letters.substring(randomLetter, randomLetter + 1);
  }

  return text;
}

setInterval(() => {
  const randomAmount: number = Number((Math.random() * 100).toFixed(8));
  const randomMessage: string = generateRandomText();
  const app: string = generateRandomText();
  const walletOne: Wallet = wallets[Math.floor(Math.random() * wallets.length)];
  const walletTwo: Wallet = wallets[Math.floor(Math.random() * wallets.length)];
  const message: Message = new Message(randomMessage);

  walletOne.transfer(randomAmount, walletTwo.publicKey);
  walletOne.sign(app);
  message.encryptMessage(walletOne.publicKey);
  console.log(`Encrypted message: ${message.text}`);
  walletTwo.sendMessage(message, walletOne.publicKey);
  message.decryptMessage(walletOne.privateKey);
  console.log(`Decrypted message: ${message.text}`);
  walletOne.revoke(app);

  blockchain.addBlock(Blockchain.transactions);
  blockchain.clearQueue();
}, 2000);
