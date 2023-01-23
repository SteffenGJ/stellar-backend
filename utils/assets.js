const {Asset} = require("stellar-sdk");
const {USDIssuer, EURIssuer, DKKIssuer, GBPIssuer} = require("./accounts")

const USD = new Asset(
    code = "USD",
    issuer = USDIssuer.publicKey()
);

const EUR = new Asset(
    code = "EUR",
    issuer = EURIssuer.publicKey()
)

const DKK = new Asset(
    code = "DKK",
    issuer = DKKIssuer.publicKey()
)

const GBP = new Asset(
    code = "GBP",
    issuer = GBPIssuer.publicKey()
)

module.exports = {USD, EUR, DKK, GBP}