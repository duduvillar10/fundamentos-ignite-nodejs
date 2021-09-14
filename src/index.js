const express = require('express');
const { v4: uuidv4 } = require("uuid")

const app = express();

app.use(express.json());

const customers = [];

console.lot("teste");
app.post("/account", (req, res) => {
    const { cpf, name } = req.body.cpf;

    const customersAlreadyExists = customers.some(
        customers => customers.cpf === cpf
    );

    if(customersAlreadyExists){
        return res.status(400).json({"error":"Customers already exits!"})
    }

    customers.push({
        cpf,
        name,
        id: uuidv4(),
        statement: []
    });

    return res.status(201).send();
});

app.get("/statement/:cpf", (req, res) => {
    const { cpf } = req.params;

    const customer = customers.find(customers => customers.cpf === cpf);

    return res.json(customer.statement);
});

app.listen(3333);