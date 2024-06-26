export const contractFunctions = {
  createVoting: async function (
    contract,
    wallet,
    _id,
    title,
    question,
    option1,
    option2,
    option3,
    option4
  ) {
    try {
      await contract.methods
        .createVoting(_id, title, question, option1, option2, option3, option4)
        .send({ from: wallet });

      console.log("Voting created successfully!");
    } catch (err) {
      console.error(err);
    }
  },

  vote: async function (contract, wallet, _id, option) {
    try {
      await contract.methods.vote(option, _id).send({ from: wallet });
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

  finishVoting: async function (contract, wallet, _id) {
    try {
      await contract.methods.finishVoting(_id).send({ from: wallet });
      console.log("vote successfully remove!");
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

  getWhitelistedAddresses: async function (contract) {
    try {
      const result = await contract.methods.getWhitelistedAddresses().call();
      console.log("WhitelistedAddresses: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  getTitle: async function (contract, _id) {
    try {
      const result = await contract.methods.getTitle(_id).call();
      console.log("Title: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  getQuestion: async function (contract, _id) {
    try {
      const result = await contract.methods.getQuestion(_id).call();
      console.log("Question: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  getOption1: async function (contract, _id) {
    try {
      const result = await contract.methods.getOption1(_id).call();
      console.log("Option1: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  getOption2: async function (contract, _id) {
    try {
      const result = await contract.methods.getOption2(_id).call();
      console.log("Option2: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  getOption3: async function (contract, _id) {
    try {
      const result = await contract.methods.getOption3(_id).call();
      console.log("Option3: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  getOption4: async function (contract, _id) {
    try {
      const result = await contract.methods.getOption4(_id).call();
      console.log("Option4: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  getCounts: async function (contract, _id) {
    try {
      const result = await contract.methods.getCounts(_id).call();
      console.log("Counts: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  getCreatorAddress: async function (contract, _id) {
    try {
      const result = await contract.methods.getCreatorAddress(_id).call();
      console.log("Result: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  getBlockNumber: async function (contract, _id) {
    try {
      const result = await contract.methods.getBlockNumber(_id).call();
      console.log("BlockNumber: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  isVotingFinished: async function (contract, _id) {
    try {
      const result = await contract.methods.isVotingFinished(_id).call();
      console.log("Result: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },

  isWhitelist: async function (contract, _id) {
    try {
      const result = await contract.methods.whitelist(_id).call();
      console.log("is White list: ", result);

      return result;
    } catch (err) {
      console.error(err);
    }
  },
};
