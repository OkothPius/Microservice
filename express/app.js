const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

//API Endpoints
//GET    -> api/customers
//GET    -> api/customers/1
//PUT    -> api/customers/1
//DELETE -> api/cutomers/1
//POST   -> api/customers

const customers = [
	{ id: 1, name: 'John' }, 
	{ id: 2, name: 'Abdalla' }, 
	{ id: 3, name: 'Naomi' }, 
	{ id: 4, name: 'Jerry' },
];

app.get('/', (req, res) => {
	res.send('Hey There!');
});


app.get('/api/customers', (req, res) => {
	res.send(customers);
});


app.get('/api/customers/:id', (req, res) => {
	const customer = customers.find( c => c.id === parseInt(req.params.id));
	if (!customer) res.status(404).send('The course with the given ID was not found');
	res.send(customer);
});


app.put('/', (req, res) => {
        //pass
});


app.post('/api/customers', (req, res) => {
	//Input Validation
	if (!req.body.name || req.body.name.length < 3){
		return res.status(400).send("Name is required and should be more than three characters");
	}

	const customer = {
		id: customers.length + 1,
		name: req.body.name,
	} ;
	customers.push(customer);
	res.send(customer);
});


app.delete('/', (req, res) => {
        //pass
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening to port http://localhost:${port}`);
});
