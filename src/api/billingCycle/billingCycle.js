const restful = require("node-restful");
const mongoose = restful.mongoose;

const creditSchema =  new mongoose.Schema({
    name: { type: String, required: [true, "É necessário informar o nome do crédito."] },
    value: { type: Number, min: 0, required: [true, "É necessário informar o valor do crédito."] }
});

const debtSchema = new mongoose.Schema({
    name: { type: String, required: [true, "É necessário informar o nome do débito."] },
    value: { type: Number, min: 0, required: [true, "É necessário informar o valor do débito."] },
    status: { type: String, required: false, uppercase: true, enum: ["PAGO", "PENDENTE", "AGENDADO"] }
});

const billingCyclesSchema = new mongoose.Schema({
    name: { type: String, required: [true, "É necessário informar o nome do ciclo de pagamento."] },
    month: { type: Number, min: 1, max: 12, required: [true, "É necessário informar o mês."] },
    year: { type: Number, min: 1970, max: 2100, required: [true, "É necessário informar o ano."] },
    credits: [creditSchema],
    debts: [debtSchema]
});

module.exports = restful.model("BillingCycle", billingCyclesSchema);
