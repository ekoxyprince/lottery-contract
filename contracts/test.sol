//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 < 0.9.0

contract Test{
    uint[] public myArray;
    constructor(){
        myArray.push(1);
        myArray.push(10); 
        myArray.push(30);
    }

   function getArrayLength() public view returns(uint){
       return myArray.length;
   }

   function getFirstArray() public view returns(uint){
       return myArray[0];
   }
   function getMyArray() public view returns(uint memory){
    return myArray;
   }
}