import { encrypt, decrypt } from "eciesjs";

export class Message {
  constructor(public text: string) {}

  public encryptMessage(publicKey: string): string {
    this.text = encrypt(publicKey, Buffer.from(this.text)).toString("base64");

    return this.text;
  }

  public decryptMessage(privateKey: string): string {
    this.text = decrypt(
      privateKey,
      Buffer.from(this.text, "base64")
    ).toString();

    return this.text;
  }
}
