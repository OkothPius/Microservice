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
	if (!customer) return res.status(404).send('The customer with the given ID was not found');
	res.send(customer);
});


app.put('/api/customers/:id', (req, res) => {
        //Look up the customer
	const customer = customers.find( c => c.id === parseInt(req.params.id));

	//If not existing, return 404
	if (!customer) return res.status(404).send('The customer with the given ID was not found ');

	//Input Validation
        const { error } = validateCustomer(req.body);

        if (error) return res.status(400).send(error.details[0].message);
      

	//Update the course
	customer.name = req.body.name;
	res.send(customer);
	//Return the updated course

});


app.post('/api/customers', (req, res) => {
	//Input Validation
	const { error } = validateCustomer(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	const customer = {
		id: customers.length + 1,
		name: req.body.name,
	} ;
	customers.push(customer);
	res.send(customer);
});


app.delete('/api/customers/:id', (req, res) => {
        //Look up the customer
	const customer = customers.find(c => c.id === parseInt(req.params.id))
	//Not existing, return 404
	if (!customer) return res.status(400).send('The customer of given ID was not found');

	//Delete
	const index = customers.indexOf(customer);
	customers.splice(index, 1);
	
	//Return the same course
	res.send(customer);
});

//Validate function
function validateCustomer(customer) {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
	});

	return schema.validate(customer);
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Listening to port http://localhost:${port}`);
});
