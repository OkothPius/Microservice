const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const routes = require('./api_routes/routes');
routes(app);

app.listen(port, () => {
	console.log(`Listening to port http://localhost:${port}`);
});
