//importing all necessary modules
const fs = require("fs")
const path = require("path")
const solc = require("solc")
// getting path to our contract to be compiled
const pathToContract = path.join(__dirname,"contracts","lottery.sol")
//using the fs module to read our contract
const source= fs.readFileSync(pathToContract,"utf-8")
//using solc to compile our contracts
let input={
    language:"Solidity",
    sources:{
        "lottery.sol":{
            content:source
        }
    }, settings:{
        outputSelection:{
            '*':{
                '*':['*']
            }
        }
    }
}
//compiling the contract in json
let output = JSON.parse(solc.compile(JSON.stringify(input)))
module.exports = output.contracts['lottery.sol']['Lottery']
