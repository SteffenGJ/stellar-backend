const app = require("./app");
const http = require("http");
const {PORT} = require("./utils/config");

const server = http.createServer(app);

console.log("tester");

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })