//app.js
const express = require('express');
const body_parser = require('body-parser');
const Routersindex = require('./routers/index.routers');
// const orderRouter = require('./routers/index');

const app = express();

app.use(body_parser.json());

app.use('/',Routersindex);
// app.use('/',orderRouter);

module.exports = app;