const {
    Server, 
    TransactionBuilder, 
    Networks, 
    Operation,
    BASE_FEE
} = require("stellar-sdk");
const {fromSecret } = require("./functions/fromSecret");

const changeTrust = async (sender, asset) => {

    const payer = fromSecret(sender);
    
    const server = new Server('https://horizon-testnet.stellar.org');
    const account = await server.loadAccount(payer.publicKey());

    let transaction = new TransactionBuilder(
        account, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET
        }
    ).addOperation(Operation.changeTrust({
        asset: asset,
        source: payer.publicKey()
    }))
    .setTimeout(30)
    .build()

    transaction.sign(payer)

    try {
        let res = await server.submitTransaction(transaction);
        console.log(`Created transaction with a hash of ${res.hash}`)
    } catch (error) {
        console.log(`${error}. More details:\n${JSON.stringify(error.response.data.extras, null, 2)}`)
    }
}

module.exports = changeTrust;