import "dotenv/config";
import * as Web3 from "@solana/web3.js";

import {
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import base58 from "bs58";

const senderPrivKey: string = process.env.SOL_SENDER_PRIVKEY || "";
const senderPubKey: string = process.env.SOL_SENDER_PUBKEY || "";

const receiverPubKey: string = process.env.SOL_RECEIVER_PUBKEY || "";

async function main() {
  const transaction = new Web3.Transaction();

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: new Web3.PublicKey(senderPubKey),
    toPubkey: new Web3.PublicKey(receiverPubKey),
    lamports: 0.05 * LAMPORTS_PER_SOL,
  });

  transaction.add(sendSolInstruction);
  const base58DecodedPK = base58.decode(senderPrivKey || "");
  const keyPairFromSecret = Web3.Keypair.fromSecretKey(base58DecodedPK);

  const connection = new Web3.Connection(Web3.clusterApiUrl("devnet"));

  const txHash = await Web3.sendAndConfirmTransaction(connection, transaction, [
    keyPairFromSecret,
  ]);
  console.log("txHash: ", txHash);
}

main();
