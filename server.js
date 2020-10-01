const express = require('express');
const app = express();
const port = 3002;

app.use('/', express.static('public'));

const budget = require("./budget-data.json");
console.log('My budget is', budget);

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    res.send(budget);
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});

