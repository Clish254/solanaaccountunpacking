const web3 = require('@solana/web3.js');
const struct = require("@aksel/structjs")
const bs58 = require('bs58')


const connection = new web3.Connection(web3.clusterApiUrl("mainnet-beta"), "confirmed");
const usdc = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
const getAccountInfo = async (publicKey) => {
    const accountInfo = await connection.getAccountInfo(new web3.PublicKey(publicKey))
    let s = struct("<I")
    const mintAuthorityOption = s.unpack(new Uint8Array(accountInfo.data).buffer.slice(0, 4))[0]
    // correct result
    console.log({ mintAuthorityOption })
    let s1 = struct("<32s")
    const mintAuthority = s1.unpack(new Uint8Array(accountInfo.data).buffer.slice(4, 36))[0]
    // wrong result
    console.log({ mintAuthority: bs58.encode(Buffer.from(mintAuthority)) })
    // should be Q but q and Q cannot be fully represented in javascript https://github.com/lyngklip/structjs#:~:text=Differences%20from%20Python%3A
    let s3 = struct("<I")
    const supply = s3.unpack(new Uint8Array(accountInfo.data).buffer.slice(36, 44))[0]
    // wrong result
    console.log({ supply })
    let s4 = struct("<B")
    const decimal = s4.unpack(new Uint8Array(accountInfo.data).buffer.slice(44, 45))[0]
    // correct result
    console.log({ decimal })

}
getAccountInfo(usdc)
