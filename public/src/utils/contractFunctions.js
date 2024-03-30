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

  vote: async function (contract, wallet, name, option) {
    try {
      await contract.methods.vote(option, name).send({ from: wallet });
      console.log("vote successfully!");
    } catch (err) {
      console.error(err);
    }
  },

  addWhitelistAddress: async function (contract, wallet, address) {
    try {
      await contract.methods
        .addWhitelistAddress(address)
        .send({ from: wallet });

      console.log("Address added in WhiteList!");
    } catch (err) {
      console.error(err);
    }
  },

  getAllQuestions: async function (contract) {
    try {
      const result = await contract.methods.getAllQuestions().call();
      console.log("getAllQuestions: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  getOption1: async function (contract, name) {
    try {
      const result = await contract.methods.getOption1(name).call();
      console.log("Option1: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  getOption2: async function (contract, name) {
    try {
      const result = await contract.methods.getOption2(name).call();
      console.log("Option2: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  getOption3: async function (contract, name) {
    try {
      const result = await contract.methods.getOption3(name).call();
      console.log("Option3: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  getPollCounts: async function (contract, name) {
    try {
      const result = await contract.methods.getPollCounts(name).call();
      console.log("Result: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  getPollName: async function (contract, name) {
    try {
      const result = await contract.methods.getPollName(name).call();
      console.log("Question: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  isWhitelist: async function (contract, name) {
    try {
      const result = await contract.methods.whitelist(name).call();
      console.log("is White list: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },
};
