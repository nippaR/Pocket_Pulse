const main = async () => {
    const Transactions = await hre.ethers.getContractFactory("Transactions");
    const transactions = await Transactions.deploy();

    // Wait for the contract to be fully deployed
    await transactions.waitForDeployment();

    // Get the contract address
    const address = await transactions.getAddress();
    console.log("Transactions deployed to:", address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

runMain();