require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI
const SECRET = process.env.SECRET
const PORT = process.env.PORT || 3001
const API_KEY = process.env.API_KEY;

module.exports = {MONGODB_URI, SECRET, PORT, API_KEY};