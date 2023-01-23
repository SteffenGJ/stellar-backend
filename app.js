const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./controllers/userController");
const transactionRouter = require("./controllers/transactionController");
const loginRouter = require("./controllers/loginController");
const {MONGODB_URI} = require("./utils/config");
const mongoose = require("mongoose");

mongoose.connect(MONGODB_URI, () => {
    console.log("CONNECTED")
}, () => {
    console.log("ERROR MONGO NOT CONNECTED");
})

app.use(cors());
app.use(express.json());

app.use("/api/login", loginRouter);
app.use("/api/user", userRouter)
app.use("/api/transaction", transactionRouter)

module.exports = app;