




export const contractFunctions = {
  createVoting: async function (
    contract,
    wallet,
    question,
    name,
    option1,
    option2,
    option3
  ) {
    try {
      await contract.methods
        .createVoting(question, name, option1, option2, option3)
        .send({ from: wallet });

      console.log("Voting created successfully!");
    } catch (err) {
      console.error(err);
    }
  },

  addWhitelistAddress: async function (contract, wallet) {
    try {
      await contract.methods.addWhitelistAddress(wallet).send({ from: wallet });

      console.log("Address added in WhiteList!");
    } catch (err) {
      console.error(err);
    }
  },

  getOption1: async function (contract, wallet) {
    try {
      const option1Value = await contract.methods.getOption1(wallet).send({ from: wallet });

      console.log("Option1", option1Value);
    } catch (err) {
      console.error(err);
    }
  },

  getOption2: async function (contract, wallet) {
    try {
      await contract.methods.getOption2(wallet).send({ from: wallet });

      console.log("Option2");
    } catch (err) {
      console.error(err);
    }
  },

  getOption3: async function (contract, wallet) {
    try {
      await contract.methods.getOption1(wallet).send({ from: wallet });

      console.log("Option3");
    } catch (err) {
      console.error(err);
    }
  },

  getPoolName: async function (contract, wallet) {
    try {
      await contract.methods.getPoolName(wallet).send({ from: wallet });

      console.log("getPoolName");
    } catch (err) {
      console.error(err);
    }
  },

  getPoolCounts: async function (contract, wallet) {
    try {
      await contract.methods.getPoolCounts(wallet).send({ from: wallet });

      console.log("getPoolCounts");
    } catch (err) {
      console.error(err);
    }
  },
};
