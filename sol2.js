import * as web3  from "@solana/web3.js";
import * as splToken from "@solana/spl-token";

// Address: 9vpsmXhZYMpvhCKiVoX5U8b1iKpfwJaFpPEEXF7hRm9N
const DEMO_WALLET_SECRET_KEY = new Uint8Array([
  60,194,20,0,190,173,127,31,49,229,6,143,44,159,67,61,117,7,138,232,194,103,163,203,218,239,23,167,161,76,214,201,207,195,79,186,194,234,85,138,60,128,197,183,30,116,58,227,134,217,25,53,194,234,169,107,93,39,102,79,163,191,104,138
]);
const DEMO_WALLET_SECRET_KEY_Second = new Uint8Array([
  224,16,62,45,182,45,183,252,247,26,91,88,196,80,65,247,36,210,21,174,19,31,28,115,216,233,0,74,185,14,230,106,154,130,86,208,12,8,129,46,5,101,249,91,94,7,215,211,18,16,182,62,156,133,204,34,7,167,43,223,102,147,187,236
]);
(async () => {
  // Connect to cluster
  var connection = new web3.Connection(web3.clusterApiUrl("testnet"));
  // Construct wallet keypairs
  var fromWallet = web3.Keypair.fromSecretKey(DEMO_WALLET_SECRET_KEY);
  var toWallet = web3.Keypair.fromSecretKey(DEMO_WALLET_SECRET_KEY_Second);
  // Construct my token class  
    var myMint = new web3.PublicKey("3FPckdMdGNRyBUTUmMk6rRWHKuNKywUqPtNKvh1GaL4J");
 
    // Construct my token class
  const myToken = new splToken.Token(
    connection,
    myMint,
    splToken.TOKEN_PROGRAM_ID,
    fromWallet.publicKey
  );

  console.log("ji3");
  console.log(myToken);

  // Create associated token accounts for my token if they don't exist yet
  var fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
    fromWallet.publicKey
  )
  var toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
    toWallet.publicKey
  )
  // Add token transfer instructions to transaction
  signature = await splToken.transfer(
    connection,
    fromWallet,
    fromTokenAccount.address,
    toTokenAccount.address,
    fromWallet.publicKey,
    50
);
  console.log("SIGNATURE", signature);
  console.log("SUCCESS");
})();