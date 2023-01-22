//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 < 0.9.0

contract Test{
    string[] public myArray;
    constructor(){
        myArray.push("hi");
    }
    function getString() public view returns(string[] memory){
      return myArray;
    }
}