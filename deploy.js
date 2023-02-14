//importing necessary libraries and setting up a provider for our web3
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3")
const assert = require('assert')
const abi = require("./compile").abi
const bytecode = require("./compile").evm.bytecode.object
//Mnemonics of the account you want to deploy it from
const mnemonicPhrase = //enter account mnemonics here
//setting up infura using our mnemonics and hdwallet-provider
const provider = new HDWalletProvider({
 mnemonic:{
    phrase:mnemonicPhrase
 },
 providerOrUrl://enter infura goerli endpoint here
})
//using the provider created with infura
const web3 = new Web3(provider)
//Deploying to infura.io
const deploy = async ()=>{
 const accounts = await web3.eth.getAccounts()
 console.log('attempting to deploy from',accounts[0])
const inbox = await new web3.eth.Contract(abi)
.deploy({data:bytecode})
 .send({from:accounts[0],gas:'1000000'})
 console.log("contract was deployed to "+inbox.options.address)
}
deploy()
