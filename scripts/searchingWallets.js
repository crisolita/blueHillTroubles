const { ethers, upgrades } = require("hardhat");
const { controllerAbi } = require("./abis.js/controller");
const { tokenAbi } = require("./abis.js/token");
const { wallets } = require("./wallets");

async function main() {
  try {
    const provider = new ethers.providers.EtherscanProvider(
      "homestead",
      "AN37TNCNFTW1CS8W7G3QV8ES1STT8Y81DN"
    );
    const controller = new ethers.Contract(
      "0x027E80B30b727506cDcb9dB5faB2B6d996908317",
      controllerAbi.abi,
      provider
    );
    const token = new ethers.Contract(
      "0x5497BC15265C33d59d1fC1F6064584d3f98eb79c",
      tokenAbi.abi,
      provider
    );
    let lista = [];
    let totalTokens = 0;
    let atrapados = 0;

    for (let i = 0; i < wallets.length; i++) {
      try {
        const avaliable = await controller.availableToTransfer(
          wallets[i].owner_wallet_address
        );
      } catch (e) {
        if (e.reason == "SafeMath: subtraction overflow") {
          const balance = await controller.balances(
            wallets[i].owner_wallet_address
          );
          const initial = await controller.initialVestedAmounts(
            wallets[i].owner_wallet_address
          );
          const first = await controller.newVestedAmounts(
            wallets[i].owner_wallet_address,
            "90"
          );
          const second = await controller.newVestedAmounts(
            wallets[i].owner_wallet_address,
            "180"
          );
          const third = await controller.newVestedAmounts(
            wallets[i].owner_wallet_address,
            "270"
          );
          const fourth = await controller.newVestedAmounts(
            wallets[i].owner_wallet_address,
            "365"
          );
          const diferencia =
            Number(ethers.utils.formatEther(initial)) +
            Number(ethers.utils.formatEther(first)) +
            Number(ethers.utils.formatEther(second)) +
            Number(ethers.utils.formatEther(third)) +
            Number(ethers.utils.formatEther(fourth)) -
            Number(ethers.utils.formatEther(balance));
          totalTokens += diferencia;
          atrapados += ethers.utils.formatEther(balance);
          const address = wallets[i].owner_wallet_address;
          const email = wallets[i].email;
          const actualBalance = await token.balanceOf(address);
          console.log({
            Wallet: address,
            "Diferencia de tokens": diferencia,
            "Balance Actual": actualBalance,
            "balance atrapado en el contrato":
              ethers.utils.formatEther(balance),
            email: email,
          });
          lista.push({
            Wallet: address,
            "Diferencia de tokens": diferencia,
            "Balance Actual": actualBalance,
            "balance atrapado en el contrato":
              ethers.utils.formatEther(balance),
            email: email,
          });
        }
      }
    }
    console.log(lista.length);
    console.log(totalTokens);
    console.log(atrapados, "atrapados");
  } catch (e) {
    console.log(e);
  }
}

main();
