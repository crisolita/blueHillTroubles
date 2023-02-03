const { ethers, upgrades } = require("hardhat");
const ipfsClient = require("ipfs-http-client");

const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

async function main() {
  try {
    const nft1155 = await ethers.getContractAt(
      "Marketplace",
      "0x683a6d3dCBCCb572e45999EDF71D1D5f41D8430A"
    );
    const role =
      "0x0000000000000000000000000000000000000000000000000000000000000000";
    const newAdmin = "0x757E0901f709FcD10A0dAAB754C216B1a1Cb3D02";
    // const makeYouAdmin = await nft1155.grantRole(role, newAdmin);
    // console.log(makeYouAdmin);
    console.log("hola");
    const wallet = ethers.Wallet.createRandom("maria", "1234ddw");
    console.log(wallet._signingKey());
  } catch (error) {
    console.log(`error`, error);
  }
}

main();
