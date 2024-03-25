// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Voting {

    struct Start {
        string title;
        string question;
        string option1;
        string option2;
        string option3;
        uint count1;
        uint count2;
        uint count3;
        mapping (address => bool) voted;
        bool exists;
    }

    address creator;
    mapping (address => bool) public whitelist;
    mapping (string => Start) polls;

    function createVoting (string memory _question, string memory _name, string memory _option1, string
        memory _option2, string memory _option3) public {
        polls[_name].title = _name;
        polls[_name].question = _question;
        polls[_name].option1 = _option1;
        polls[_name].option2 = _option2;
        polls[_name].option3 = _option3;
        polls[_name].count1 = 0;
        polls[_name].count2 = 0;
        polls[_name].count3 = 0;
        polls[_name].exists = true;
        creator = msg.sender;
    }

    function addWhitelistAddress (address _address) public {
        if (msg.sender != creator) return;
        whitelist[_address] = true;
    }

    function addManyWhitelistAddress (address[] memory _addresses) public {
    if (msg.sender != creator) return;
        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelist[_addresses[i]] = true;
        }
    }

    function vote (string memory optionName, string memory pollName) public {
        require(doesPollExist(pollName), "Poll does not exist");
        require(whitelist[msg.sender], "Address not whitelisted");
        require(hasAlreadyVoted(pollName), "Address has already voted");
        polls[pollName].voted[msg.sender] = true;
        if (keccak256(abi.encodePacked(polls[pollName].option1)) == keccak256(abi.encodePacked(optionName))) {
            polls[pollName].count1 += 1; 
        }
        if (keccak256(abi.encodePacked(polls[pollName].option2)) == keccak256(abi.encodePacked(optionName))) {
            polls[pollName].count2 += 1; 
        }
        if (keccak256(abi.encodePacked(polls[pollName].option3)) == keccak256(abi.encodePacked(optionName))) {
            polls[pollName].count3 += 1; 
        }
    }

    function getPollName (string memory pollName) public view returns (string memory) {
        require(doesPollExist(pollName));
        return polls[pollName].question;
    }

    function getOption1 (string memory pollName) public view returns (string memory) {
        require(doesPollExist(pollName));
        return polls[pollName].option1;
    }

    function getOption2 (string memory pollName) public view returns (string memory) {
        require(doesPollExist(pollName));
        return polls[pollName].option2;
    }

    function getOption3 (string memory pollName) public view returns (string memory) {
        require(doesPollExist(pollName));
        return polls[pollName].option3;
    }

    function getPollCounts (string memory pollName) public view returns (uint[3] memory) {
        require(doesPollExist(pollName));
        return [polls[pollName].count1, polls[pollName].count2,
        polls[pollName].count3];
    }

    function myFunction() public view returns(uint256, string memory) {
        return (23456, "Hello!%");
    }

    function doesPollExist (string memory pollName) private view returns (bool) {
    if (polls[pollName].exists) {
        return true;
    } else {
        return false;
    }}

    function hasAlreadyVoted (string memory pollName) private view returns (bool) {
    if (polls[pollName].voted[msg.sender]) {
        return false;
    } else {
        return true;
    }}
}