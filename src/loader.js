const server = require("./config/server.js");
require("./config/database.js");
const routes = require("./config/routes.js");
routes(server);
