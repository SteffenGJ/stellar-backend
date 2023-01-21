const bcrypt = require('bcrypt');
const loginRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../utils/config");

loginRouter.post("/", async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne({username});

    const decrypted = await bcrypt.compare(password, user.password)

    if (!user) {
        return res.json("WRONG USERNAME");
    }

    if (!decrypted) {
        return res.json("WRONG PASSWORD");
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(userForToken, SECRET);

    res.json({token, id: user._id});
})

module.exports = loginRouter;