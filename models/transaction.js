const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    amount: Number,
    date: String,
    hash: String
});


module.exports = mongoose.model("Transaction", transactionSchema);