const express = require('express');
const path = require('path');
const bodyParser= require('body-parser');


const cards = require('./routes/cards');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/cards', cards);

app.listen(3000);