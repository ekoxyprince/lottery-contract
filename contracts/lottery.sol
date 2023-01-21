//SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 < 0.9.0;
//creation of contract 
contract Lottery{
    //initializing arrays for the manager and players
    address public manager;
    address[] public players;
// constructor function
    constructor(){
        //accessing the message option to get the person calling the function(contract creator)
    manager = msg.sender;
    }
    // function for entering into competition
    function enter() public payable{
//using the require function to set conditions in our contracts 
require(msg.value > .01 ether,"insufficient amount of ethers");

        //pushing into the players array to get and accessing the message to get the address of the function caller(playersy)
 players.push(msg.sender);
    }
    /*creating or generating a random number to help us pick a winner*/
    function random() private view returns(uint){
return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp,players)));
    }
    //picking a winner using the random number generated
    function pickWinner() public /*restricted(the modifier function created) */ {
        //make sure only manager can pick winner
        require(msg.sender == manager,"unauthorized access to this request");
        //picking winner randomly and sending ethers
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        players = new address[](0);
    } 
    //setting up function modifier to help us in refactoring of our code
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    //function that checks to see the number of players that entered the competition
    function fetchAllPlayers() public view returns(address[] memory){
        return players;
    }

}