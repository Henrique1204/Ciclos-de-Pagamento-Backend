const BillingCycle = require("./billingCycle.js");

BillingCycle.methods(["get", "post", "put", "delete"]);
BillingCycle.updateOptions({ new: true, runValidators: true });

// Rota de GET está com problema por conta das versões das bibliotecas instaladoas.
// Para solucionar é preciso do código abaixo.
BillingCycle.route('get', (req, res, next) => {
    BillingCycle.find({}, (err, docs) => {
        if(!err) {
            res.json(docs)
        } else {
            res.status(500).json({errors: [error]})
        }
    });
});

BillingCycle.route("count", (req, res, next) => {
    BillingCycle.count((erro, value) => {
        if (erro) {
            res.status(500).json({ errors: [erro] });
        } else {
            res.json({ value });
        }
    });
});

module.exports = BillingCycle;
