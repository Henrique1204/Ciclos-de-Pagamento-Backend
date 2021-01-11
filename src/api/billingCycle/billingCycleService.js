const BillingCycle = require("./billingCycle.js");
const errorHandle = require("../commum/errorHandle.js");
const billingCycle = require("./billingCycle.js");

BillingCycle.methods(["get", "post", "put", "delete"]);
BillingCycle.updateOptions({ new: true, runValidators: true });
billingCycle.after("post", errorHandle).after("put", errorHandle);

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

BillingCycle.route('summary', (req, res, next) => {
    BillingCycle.aggregate([{ 
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}} 
    }, { 
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
    }, { 
        $project: {_id: 0, credit: 1, debt: 1}
    }], (error, result) => {
        if(error) {
            res.status(500).json({errors: [error]});
        } else {
            res.json(result[0] || {credit: 0, debt: 0});
        }
    });
});

module.exports = BillingCycle;
