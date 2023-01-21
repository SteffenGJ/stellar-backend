const transactionRouter = require("express").Router();
const Transaction = require("../models/transaction");
const User = require("../models/user");
const stellarTransaction = require("../utils/stellarTransaction");

transactionRouter.get("/", (req, res) => {
    res.json("Appelsin")
});

transactionRouter.get("/:userId", async (req, res) => {
    const {userId} = req.params;

    const user = await User.findById(userId).populate({path: "transactions", populate: {path: "from to"}});
    console.log(user);

    res.json(user.transactions);
})

transactionRouter.post("/", async (req, res) => {
    const transaction = req.body;

    const reciever = await User.findOne({username: transaction.to});
    const sender = await User.findOne({username: transaction.from});

    if (!reciever || !sender) {
        return res.json("UNKNOWN USER");
    }

    const transactionResult = await stellarTransaction(sender.privateKey, reciever.publicKey, `${transaction.amount}`, transaction.asset);
    console.log(transactionResult);

    const savedTransaction = await Transaction.create({
        to: reciever._id,
        from: sender._id,
        amount: transaction.amount,
        date: transactionResult.created_at,
        hash: transactionResult.hash
    })
    
    await savedTransaction.save();

    reciever.transactions = reciever.transactions.concat(savedTransaction._id);
    sender.transactions = sender.transactions.concat(savedTransaction._id);
    reciever.balance = reciever.balance + Number(transaction.amount);
    sender.balance = sender.balance - Number(transaction.amount);

    await reciever.save();
    await sender.save();

    res.json(savedTransaction);
})

transactionRouter.post("/trust", async (req, res) => {
    const {payer, asset} = req.body;

    await changeTrust(payer, DollarAsset);

    const user = await User.findOne({privateKey: payer});

    user.accepts = user.accepts.concat(DollarAsset.code);

    await user.save();

    res.json({accepting: user.accepts});
})

module.exports = transactionRouter;