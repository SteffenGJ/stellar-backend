const User = require("../../models/user");

const isAccepting = async (publicKey, asset) => {
    const user = await User.findOne({publicKey});

    if (!user.accepts.find(val => asset.code === val)) {
        return new Error("Reciever user doesn't accept the currency you are trying to send")
    };

    return true;
}

module.exports = {isAccepting};