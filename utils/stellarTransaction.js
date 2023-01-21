const {
    Keypair,
    Server,
    BASE_FEE,
    Networks,
    TransactionBuilder,
    Operation,
    Asset
} = require("stellar-sdk");
const {isAccepting} = require("./functions/isAccepting");


const stellarTransaction = async (payer, reciever, amount, asset) => {

    const accept = await isAccepting(reciever, asset);

    if (!accept) {
        return new Error("isAccepting is returning false");
    };

    const payerKeypair = Keypair.fromSecret(payer);
    
    const server = new Server('https://horizon-testnet.stellar.org');
    const account = await server.loadAccount(payerKeypair.publicKey());

    let transaction = new TransactionBuilder(
        account, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET
        }
    ).addOperation(Operation.payment({
        destination: reciever,
        asset,
        amount,
    }))
    .setTimeout(30)
    .build()

    transaction.sign(payerKeypair);

    try {
        let res = await server.submitTransaction(transaction);
        console.log(`Created transaction with a hash of ${res.hash}`)
        return {created_at: res.created_at, id: res.id, hash: res.hash};
    } catch (error) {
        console.log(`${error}. More details:\n${JSON.stringify(error.response.data.extras, null, 2)}`)
    }
}

module.exports = stellarTransaction;