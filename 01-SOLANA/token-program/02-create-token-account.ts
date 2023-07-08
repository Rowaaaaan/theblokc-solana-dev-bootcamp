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

const mintPubKey: Web3.PublicKey = new Web3.PublicKey(
  process.env.MINT_PUBKEY || ""
);

async function main() {
  console.log("Creating token account...");
  const conn = new Web3.Connection(Web3.clusterApiUrl("devnet"));

  const signerDecodedPrivKey = base58.decode(signerPrivKey);
  // Signer
  const payer = Web3.Keypair.fromSecretKey(signerDecodedPrivKey);
  const accountOwner = new Web3.PublicKey(
    "Gokcctn6TwPYsaadZcPuKQBw3hEPk5TJKt4VXCreamjE"
  );

  const tokenAccount = await token.createAccount(
    conn,
    payer,
    mintPubKey,
    accountOwner
  );

  console.log("Token account: ", tokenAccount.toBase58());
}

main();
