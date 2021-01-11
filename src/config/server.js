const port = 3003;

// Middlewares
const bodyParser = require("body-parser");
const allowCors = require("./cors.js");
const express = require("express");
const server = express();

server.use(allowCors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(port, () => console.log(`Servidor rodando na porta ${port}.`));

module.exports = server;
