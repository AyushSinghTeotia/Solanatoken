import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createMint, getOrCreateAssociatedTokenAccount, mintTo, transfer } from '@solana/spl-token';
import * as web3 from "@solana/web3.js";
const DEMO_WALLET_SECRET_KEY = new Uint8Array([
    60,194,20,0,190,173,127,31,49,229,6,143,44,159,67,61,117,7,138,232,194,103,163,203,218,239,23,167,161,76,214,201,207,195,79,186,194,234,85,138,60,128,197,183,30,116,58,227,134,217,25,53,194,234,169,107,93,39,102,79,163,191,104,138
  ]);
  const DEMO_WALLET_SECRET_KEY_Second = new Uint8Array([
    224,16,62,45,182,45,183,252,247,26,91,88,196,80,65,247,36,210,21,174,19,31,28,115,216,233,0,74,185,14,230,106,154,130,86,208,12,8,129,46,5,101,249,91,94,7,215,211,18,16,182,62,156,133,204,34,7,167,43,223,102,147,187,236
  ]);
(async () => {
    // Connect to cluster
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    // Generate a new wallet keypair and airdrop SOL          
    const fromWallet = web3.Keypair.fromSecretKey(DEMO_WALLET_SECRET_KEY);
    const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);
    // Wait for airdrop confirmation
    await connection.confirmTransaction(fromAirdropSignature);
    // Generate a new wallet to receive newly minted token
    const toWallet = web3.Keypair.fromSecretKey(DEMO_WALLET_SECRET_KEY_Second)
    // Create new token mint
    const mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 18);
    // Get the token account of the fromWallet address, and if it does not exist, create it
    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        fromWallet.publicKey
    );

    // Get the token account of the toWallet address, and if it does not exist, create it
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, toWallet.publicKey);
    // Mint 1 new token to the "fromTokenAccount" account we just created
    let signature = await mintTo(
        connection,
        fromWallet,
        mint,
        fromTokenAccount.address,
        fromWallet.publicKey,
        2000000000000000000
    );
    console.log('mint tx:', signature);

    // Transfer the new token to the "toTokenAccount" we just created
    signature = await transfer(
        connection,
        fromWallet,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        1000000000000000000
    );
})();