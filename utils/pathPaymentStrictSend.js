const {
    Keypair,
    Server,
    TransactionBuilder,
    BASE_FEE,
    Asset,
    Networks,
    Operation
} = require("stellar-sdk");
const axios = require("axios");

const pathPaymentStrictSend = async (sendAsset, destAsset, payer, reciever, distributor, issuer, sendAmount) => {

    //const data = await axios.get(`https://api.currencyapi.com/v3/latest?apikey=${process.env.API_KEY}`)

    const server = new Server("https://horizon-testnet.stellar.org");
    const payerAccount = await server.loadAccount(payer.publicKey());

    const transaction = new TransactionBuilder(
        payerAccount, {
            fee: BASE_FEE,
            networkPassphrase: Networks.TESTNET
        })
        .addOperation(Operation.payment({
            destination: distributor.publicKey(),
            asset: destAsset,
            amount: "1000",
            source: issuer.publicKey()
        }))
        .addOperation(Operation.createPassiveSellOffer({
            selling: sendAsset,
            buying: destAsset,
            amount: `${Number(sendAmount)}`,
            price: "1",
            source: distributor.publicKey()
        }))
         .addOperation(Operation.createPassiveSellOffer({
             selling: destAsset,
             buying: sendAsset,
             amount: `${Number(sendAmount)}`,
             price: "1",
             source: distributor.publicKey()
        }))
        .addOperation(Operation.pathPaymentStrictSend({
            sendAsset,
            sendAmount,
            destination: reciever.publicKey(),
            destAsset,
            destMin: "1"
        }))
        .setTimeout(30)
        .build()

        transaction.sign(
            payer,
            issuer,
            distributor
        )

        try {
            let res = await server.submitTransaction(transaction);
            console.log(`Created transaction with hash ${res.hash}`);
        } catch(error) {
            console.log(`${error}. More details:\n${JSON.stringify(error.response.data.extras, null, 2)}`)
        }
}

module.exports = pathPaymentStrictSend;