const {
    Keypair, 
    Server, 
    TransactionBuilder, 
    Networks, 
    Operation, 
    BASE_FEE
} = require("stellar-sdk");
const { fromSecret } = require("./functions/fromSecret");

const createAccount = async (payer) => {

    const key = Keypair.random();
    
    const server = new Server('https://horizon-testnet.stellar.org');
    const account = await server.loadAccount(payer.publicKey());


    let transaction = new TransactionBuilder(
        account, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET
        }
    ).addOperation(Operation.createAccount({
        destination: key.publicKey(),
        startingBalance: "50"
    }))
    .setTimeout(30)
    .build()

    transaction.sign(payer)

    try {
        let res = await server.submitTransaction(transaction);
        console.log(`Created transaction with a hash of ${res.hash}`)
        return key;
    } catch (error) {
        console.log(`${error}. More details:\n${JSON.stringify(error.response.data.extras, null, 2)}`)
    }
}

module.exports = createAccount;