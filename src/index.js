const express = require('express');
const {v4: uuidv4} = require('uuid');

const app = express();
app.use(express.json());

const customers = [];

function verifyIfSSNExists(request, response, next) {
    
    const { ssn } = request.headers;

    const customer = customers.find(customer => customer.ssn === ssn);
    if (!customer) {
        return response.status(400).json({error: "Customer not found"})
    }

    request.customer = customer;
    return next();
}

function getBalance(statement) {
    const balance = statement.reduce( (acc, operation) => {
        if(operation.type === "credit") {
            return acc + operation.amount;
        }

        return acc - operation.amount;
    }, 0);

    return balance;
}

app.get('/', (request, response) => {
    response.json({Message: "Rocketseat's FinApi #01!"});
});

app.get('/accounts', (request, response) => {
    response.status(201).json(customers);
})

app.get('/account', verifyIfSSNExists, (request, response) => {
    const { customer } = request;
    return response.status(201).json(customer);
})

app.get('/statement', verifyIfSSNExists, (request, response) => {
    
    const {customer} = request;
    response.status(201).json({
        customerName: customer.name,
        customerStatement: customer.statement
    })
})

app.get("/statement/date", verifyIfSSNExists, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter(statement => statement.created_at.toDateString() === new Date(dateFormat).toDateString());

    console.log(statement);

    return response.status(201).json(statement);
})

app.post('/account', (request, response) => {
    	
    const { ssn, name } = request.headers;
    const isSsnDuplicate = customers.some(c => c.ssn === ssn)     
    
    if (isSsnDuplicate) {
        return response.status(400).json({error: "User account with same SSN already exists"})
    }
    const accountDetails = {
        name,
        ssn,
        id: uuidv4(),
        statement: []
    };

    customers.push(accountDetails);
    response.status(201).json(accountDetails);

})

app.put('/account', verifyIfSSNExists, (request, response) => {
    const { customer } = request;
    const { name } = request.body;

    customer.name = name;
    return response.status(201).json({
        message: 'succesful',
        updatedInfo: customer,
    })
})

app.post('/deposit', verifyIfSSNExists, (request, response) => {
    const {amount, description} = request.body;
    const { customer } = request;

    const newStatementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    customer.statement.push(newStatementOperation);

    response.status(201).json({
        Message: "New deposit created",
        Details: newStatementOperation
    })
})

app.post('/withdraw', verifyIfSSNExists, (request, response) => {
    const { amount } = request.body;
    const { customer } = request;

    const balance = getBalance(customer.statement);

    if (balance < amount) {
        return response.status(400).json({error: 'Insufficient funds'})
    }

    const newStatementOperation = {
        amount,
        created_at: new Date(),
        type: "withdraw"
    }

    customer.statement.push(newStatementOperation);

    response.status(201).json({
        Message: "Withdraw was succesful",
        Details: newStatementOperation
    })
})

app.delete('/account', verifyIfSSNExists, (request, response) => {
    const { customer } = request;
    customers.splice(customer);

    return response.status(201).json({
        message: "User deleted succesfully",
        customers,
    })
})

app.listen(3333, () => {
    console.log('App is running on PORT 3333!');
});