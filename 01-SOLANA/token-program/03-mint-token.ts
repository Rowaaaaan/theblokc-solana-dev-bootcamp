import "dotenv/config";
import * as Web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";

import {
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import base58 from "bs58";
import { mintTo } from "@solana/spl-token";

const signerPrivKey: string = process.env.SOL_SIGNER_PRIVKEY || "";
const signerPubKey: Web3.PublicKey = new Web3.PublicKey(
  process.env.SOL_SIGNER_PUBKEY || ""
);

const receiverPubKey: Web3.PublicKey = new Web3.PublicKey(
  process.env.SOL_RECEIVER_PUBKEY || ""
);

const mintPubKey: Web3.PublicKey = new Web3.PublicKey(
  process.env.MINT_PUBKEY || ""
);

const tokenAccount: Web3.PublicKey = new Web3.PublicKey(
  process.env.TOKEN_ACCOUNT || ""
);

async function main() {
  console.log("Minting token...");
  const conn = new Web3.Connection(Web3.clusterApiUrl("devnet"));

  const signerDecodedPrivKey: Web3.Ed25519SecretKey =
    base58.decode(signerPrivKey);
  const payer: Web3.Keypair = Web3.Keypair.fromSecretKey(signerDecodedPrivKey);
  const destUser: Web3.PublicKey = tokenAccount;
  const authority: Web3.PublicKey = signerPubKey;
  const amount: number = 1000000 * LAMPORTS_PER_SOL;

  const mintHash = await mintTo(
    conn,
    payer,
    mintPubKey,
    destUser,
    authority,
    amount
  );

  console.log("Mint hash: ", mintHash);
}

main();
