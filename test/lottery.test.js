//importing all neccessary library and creating a provider using ganache-cli
const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
//using ganache as our provider
const web3 = new Web3(ganache.provider())
//fetching our bytecode and Abi from our compiled contract
const {abi} = require("../compile")
const bytecode = require("../compile").evm.bytecode.object

let accounts;
let lottery;
//using mocha to run certain tests
beforeEach(async ()=>{
    accounts = await web3.eth.getAccounts()
    lottery = await new web3.eth.Contract(abi)
    .deploy({data:bytecode})
    .send({from:accounts[0],gas:'1000000'})
})
//describe and it functions 
describe("Lottery",()=>{
    //if the contract has been deployed successfully
    it('deploys a contract',()=>{
        assert.ok(lottery.options.address)
    })
    // if a user has entered the lottery by sending certain amount of wei
    it('allows one accounts to enter', async ()=>{
        await lottery.methods.enter().send({from:accounts[0],
        value:web3.utils.toWei('0.02','ether')})
       
        const players = await lottery.methods.fetchAllPlayers().call({
            from:accounts[0]
        })
        assert.equal(accounts[0],players[0])
        assert.equal(1,players.length)
    })
    //checking to see if multiple users can enter
    it('allows multiple accounts to enter', async ()=>{
        await lottery.methods.enter().send({from:accounts[0],
        value:web3.utils.toWei('0.02','ether')})
        await lottery.methods.enter().send({from:accounts[1],
            value:web3.utils.toWei('0.02','ether')})
            await lottery.methods.enter().send({from:accounts[2],
                value:web3.utils.toWei('0.02','ether')})
        const players = await lottery.methods.fetchAllPlayers().call({
            from:accounts[0]
        })
        assert.equal(accounts[0],players[0])
        assert.equal(accounts[1],players[1])
        assert.equal(accounts[2],players[2])
        assert.equal(3,players.length)
    })
//checking if users provides the minimum amount of ether to join the competition
    it("requires a minimum amount of ether to enter the lottery", async ()=>{
try {
    await lottery.methods.enter().send({from:accounts[3],value:200});
    assert(false)
} catch (error) {
    assert(error);
}
    })
//checking to see that only manager can pick winner
    it('only manager can call pickwinner', async ()=>{
        try{
await lottery.methods.pickWinner().send({
    from:accounts[0]
});
assert(false);
        }catch(err){
assert(err)
        }
    })
    //sending money to whoever wins and resets the players array
    it("sends money to winner and resets players array",async ()=>{
        await lottery.methods.enter().send({
            from:accounts[2],
            value:web3.utils.toWei('0.5','ether')
        })
        const initialBalance = await web3.eth.getBalance(accounts[2])
        await lottery.methods.pickWinner().send({
            from:accounts[0]
        })
        const finalBalance = await web3.eth.getBalance(accounts[2])
        const testBalance = parseInt(initialBalance)+parseInt(web3.utils.toWei("0.5","ether"))
        const players = await lottery.methods.fetchAllPlayers().call({
            from:accounts[0]
        })
        assert.equal(testBalance,finalBalance)
        assert.equal(0,players.length)
    })
})
