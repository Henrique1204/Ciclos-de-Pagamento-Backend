const express = require("express");

module.exports = (server) => {
    // Definir URL base para as rotas.
    const router = express.Router();
    server.use("/api", router);

    // Rotas de Ciclo de Pagamento.
    const BillingCycles = require("../api/billingCycle/billingCycleService.js");
    BillingCycles.register(router, "/billingCycles");
}

