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

  getPoolName: function () {
    console.log("getPoolName");
  },

  getOption1: function () {
    console.log("getOption1");
  },

  getOption2: function () {
    console.log("getOption1");
  },

  getOption3: function () {
    console.log("getOption1");
  },
};
