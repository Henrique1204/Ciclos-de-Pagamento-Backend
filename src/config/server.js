const port = 3003;

// Middlewares
const allowCors = require("./cors.js");
const bodyParser = require("body-parser");
const queryParse = require("express-query-int");
const express = require("express");
const server = express();

server.use(allowCors);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(queryParse());

server.listen(port, () => console.log(`Servidor rodando na porta ${port}.`));

module.exports = server;
