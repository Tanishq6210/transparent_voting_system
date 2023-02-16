//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.6;

contract voting{
    uint[3] candidate_votes = [0,0,0];
    address[3] candidates = [0x923CA8344c0Caf9CDe423AfdE339Dc121b0cc47d,0xafEDB8e25e200990C58136eD575253D5eC0F0dF7,0x660f4a772f90a79A71C8fc456EAc64d65A0b6e51];
    
    mapping(address=>uint) count;
    event newWave(address indexed from, uint timestamp, address to, uint cnt);

    struct Vote{
        address from;
        uint time;
        address to;
    }

    Vote[] votes;

    function giveVote(uint ind) public {
        // require(count[msg.sender] == 0, "You can only vote once");
        candidate_votes[ind]++;
        count[msg.sender]++;
        Vote memory temp = Vote(msg.sender,block.timestamp,candidates[ind]);
        votes.push(temp);

        emit newWave(msg.sender, block.timestamp, candidates[ind], candidate_votes[ind]);
    }

    function getVotes() public view returns(uint[3] memory){
        return candidate_votes;
    }

    function getAllVotes() public view returns(Vote[] memory){
        return votes;
    }
}