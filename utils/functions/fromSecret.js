const {Keypair} = require("stellar-sdk");

const fromSecret = (privateKey) => {
    const keypair = Keypair.fromSecret(privateKey);
    return keypair;
}

module.exports = {fromSecret};