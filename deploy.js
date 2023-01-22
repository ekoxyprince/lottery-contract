//importing necessary libraries and setting up a provider for our web3
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3")
const assert = require('assert')
const abi = require("./compile").abi
const bytecode = require("./compile").evm.bytecode.object
//Mnemonics of the account you want to deploy it from
const mnemonicPhrase = 'tank raw grow install work push track badge burst mix silent pear'
//setting up infura using our mnemonics and hdwallet-provider
const provider = new HDWalletProvider({
 mnemonic:{
    phrase:mnemonicPhrase
 },
 providerOrUrl:'https://goerli.infura.io/v3/09ebb8ee1cd8451ea0251eaeddda3a6e'
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