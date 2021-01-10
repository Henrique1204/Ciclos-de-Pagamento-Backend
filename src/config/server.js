const port = 3003;

// Middlewares
const bodyParser = require("body-parser");
const express = require("express");
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(port, () => console.log(`Servidor rodando na porta ${port}.`));
