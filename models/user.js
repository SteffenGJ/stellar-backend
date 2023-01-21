const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    publicKey: String,
    privateKey: String,
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction"
    }],
    balance: {
        USD: Number,
        EUR: Number,
        DKK: Number,
        XLM: Number
    },
    accepts: ["XLM"]
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
})

module.exports = mongoose.model("User", userSchema);