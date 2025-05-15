require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/AKF6gIvtVx3F_mX67v86w-Mv8jRaUeab",
      accounts: ["b31c6df5c4007fd4cf85acfabd1755274fb352a00d2fd9de4830662847bd00e8" ]
    }
  }
}
