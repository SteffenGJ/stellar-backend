require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET
const PORT = process.env.PORT || 3001

module.exports = {MONGODB_URI, SECRET, PORT};