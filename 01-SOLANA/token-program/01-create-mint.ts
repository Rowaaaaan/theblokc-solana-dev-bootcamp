import "dotenv/config";
import * as Web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";

import {
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import base58 from "bs58";

const signerPrivKey: string = process.env.SOL_SIGNER_PRIVKEY || "";
const signerPubKey: Web3.PublicKey = new Web3.PublicKey(
  process.env.SOL_SIGNER_PUBKEY || ""
);

async function main() {
  const conn = new Web3.Connection(Web3.clusterApiUrl("devnet"));
  const signerDecodedPK = base58.decode(signerPrivKey);
  const signer = Web3.Keypair.fromSecretKey(signerDecodedPK);

  const rugpull = await token.createMint(
    conn,
    signer,
    signerPubKey,
    signerPubKey,
    9
  );

  console.log("Token hash: ", rugpull.toBase58());
}

main();
