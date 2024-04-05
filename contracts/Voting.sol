// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Voting {

    struct Start {
        string id;
        string title;
        string question;
        string option1;
        string option2;
        string option3;
        string option4;
        uint count1;
        uint count2;
        uint count3;
        uint count4;
        mapping (address => bool) voted;
        bool exists;
    }

    address creator;
    mapping (address => bool) public whitelist;
    mapping (string => Start) polls;
    string[] public pollIDs;
    address[] private whitelistedAddresses;

    function createVoting (string memory _id, string memory _title, string memory _question, string memory _option1, string
        memory _option2, string memory _option3, string memory _option4) public {
        polls[_id].id = _id;
        polls[_id].title = _title;
        polls[_id].question = _question;
        polls[_id].option1 = _option1;
        polls[_id].option2 = _option2;
        polls[_id].option3 = _option3;
        polls[_id].option4 = _option4;
        polls[_id].count1 = 0;
        polls[_id].count2 = 0;
        polls[_id].count3 = 0;
        polls[_id].count4 = 0;
        polls[_id].exists = true;
        creator = msg.sender;
        pollIDs.push(_id);
    }

    function getAllQuestions() public view returns (string[] memory) {
        return pollIDs;
    }

    function addWhitelistAddress(address _address) public {
        if (msg.sender != creator) return;
        whitelist[_address] = true;
        whitelistedAddresses.push(_address); // Добавляем адрес в массив
    }

    function addManyWhitelistAddress(address[] memory _addresses) public {
        if (msg.sender != creator) return;
        for (uint256 i = 0; i < _addresses.length; i++) {
            whitelist[_addresses[i]] = true;
            whitelistedAddresses.push(_addresses[i]); // Добавляем адрес в массив
        }
    }

    function getWhitelistedAddresses() public view returns (address[] memory) {
        return whitelistedAddresses;
    }




    function vote (string memory _option, string memory _id) public {
        require(doesPollExist(_id), "Poll does not exist");
        require(whitelist[msg.sender], "Address not whitelisted");
        require(!hasAlreadyVoted(_id), "Address has already voted");

        polls[_id].voted[msg.sender] = true;

        if (keccak256(abi.encodePacked(polls[_id].option1)) == keccak256(abi.encodePacked(_option))) {
            polls[_id].count1 += 1; 
        }
        if (keccak256(abi.encodePacked(polls[_id].option2)) == keccak256(abi.encodePacked(_option))) {
            polls[_id].count2 += 1; 
        }
        if (keccak256(abi.encodePacked(polls[_id].option3)) == keccak256(abi.encodePacked(_option))) {
            polls[_id].count3 += 1; 
        }

        if (keccak256(abi.encodePacked(polls[_id].option4)) == keccak256(abi.encodePacked(_option))) {
            polls[_id].count4 += 1; 
        }
    }

    function getQuestion (string memory _id) public view returns (string memory) {
        require(doesPollExist(_id));
        return polls[_id].question;
    }

    function getTitle (string memory _id) public view returns (string memory) {
        require(doesPollExist(_id));
        return polls[_id].title;
    }

    function getOption1 (string memory _id) public view returns (string memory) {
        require(doesPollExist(_id));
        return polls[_id].option1;
    }

    function getOption2 (string memory _id) public view returns (string memory) {
        require(doesPollExist(_id));
        return polls[_id].option2;
    }

    function getOption3 (string memory _id) public view returns (string memory) {
        require(doesPollExist(_id));
        return polls[_id].option3;
    }

    function getOption4 (string memory _id) public view returns (string memory) {
        require(doesPollExist(_id));
        return polls[_id].option4;
    }

    function getCounts (string memory _id) public view returns (uint[4] memory) {
        require(doesPollExist(_id));
        return [polls[_id].count1, polls[_id].count2,
        polls[_id].count3, polls[_id].count4];
    }

    function doesPollExist (string memory _id) private view returns (bool) {
        return polls[_id].exists;
    }

    function hasAlreadyVoted (string memory _id) private view returns (bool) {
        return polls[_id].voted[msg.sender];
    }
}
