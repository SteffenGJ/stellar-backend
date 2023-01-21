const bcrypt = require('bcrypt');
const userRouter = require("express").Router();
const User = require("../models/user");
const {
    Keypair
} = require("stellar-sdk");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");
const {accountStarter} = require("../utils/accounts");
const createAccount = require("../utils/createAccount");

userRouter.get("/", (req, res) => {
    console.log(req);
    res.json(235234)
});

userRouter.get("/:id", async (req, res) => {
    const {id} = req.params;
    console.log(id);
    const user = await User.findById(id).populate({path: "transactions", populate: {path: "from to"}});
    console.log(user);
    res.json(user);
})

userRouter.post("/", async (req, res) => {
    const {username, password} = req.body;

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const key = await createAccount(accountStarter);

    const user = await User.create({
        username,
        password: passwordHash,
        publicKey: key.publicKey(),
        privateKey: key.secret(),
        transactions: [],
        balance: {
            XLM: 50
        },
        accepts: ["XLM"]
    });

    await user.save();

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, SECRET);

    console.log(user);

    res.json({token, id: user._id});
})

module.exports = userRouter;