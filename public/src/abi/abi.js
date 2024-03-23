export const createVotingABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_question",
        type: "string",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_option1",
        type: "string",
      },
      {
        internalType: "string",
        name: "_option2",
        type: "string",
      },
      {
        internalType: "string",
        name: "_option3",
        type: "string",
      },
    ],
    name: "createVoting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
