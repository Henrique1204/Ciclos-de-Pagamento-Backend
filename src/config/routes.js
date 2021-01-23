const express = require("express");
const auth = require("./auth.js");

module.exports = (server) => {
    // Rotas fechadas.
    const protectedApi = express.Router();
    server.use("/api", protectedApi);

    protectedApi.use(auth);

    // Definir URL base para as rotas.
    const router = express.Router();
    server.use("/api", router);

    // Rotas de Ciclo de Pagamento.
    const BillingCycles = require("../api/billingCycle/billingCycleService.js");
    BillingCycles.register(router, "/billingCycles");

    // Rotas Abertas.
    const openApi = express.Router();
    server.use("/opai", openApi);

    const AuthService = require("../api/user/authService.js");
    openApi.post("/login", AuthService.login);
    openApi.post("/signup", AuthService.signUp);
    openApi.post("/validarToken", AuthService.validarToken);
}
