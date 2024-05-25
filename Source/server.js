require("dotenv").config({ path: "variaveis.env" });
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const server = express();
server.use(express.json());
server.use(routes);
server.use(cors());

server.listen(process.env.PORT, () => {
  console.log("Server ligado");
});
