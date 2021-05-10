const { request, response } = require('express');
const express = require('express');
const {v4: uuidv4} = require('uuid');

const app = express();
app.use(express.json());

const customers = [];

app.get('/', (request, response) => {
    response.json({Message: "Rocketseat's FinApi #01!"});
});

app.get('/account', (request, response) => {
    response.status(201).json(customers);
})

app.get('/statement', (request, response) => {
    const { ssn } = request.query;
    const customerExists = customers.find(customer => customer.ssn === ssn);
    if (customerExists) {
        return response.status(201).json({
            Customer: customerExists.name,
            Statement: customerExists.statement
        })
    };

    return response.status(400).json({
        Error: `Could not find a customer with SSN: ${ssn}`
    })
})

app.post('/account', (request, response) => {
    	
    const { ssn, name } = request.body;
    const customerAlreadyExists = customers.some(customer => customer.ssn === ssn);

    if (customerAlreadyExists) {
        return response.status(400).json({
            Error: `Customer with SSN ${ssn} already exists`
        })
    };

    const accountDetails = {
        name,
        ssn,
        id: uuidv4(),
        statement: []
    };

    customers.push(accountDetails);
    response.status(201).json(accountDetails);

})







app.listen(3333, () => {
    console.log('App is running on PORT 3333!');
});