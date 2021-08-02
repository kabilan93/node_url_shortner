const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const app = express();
const cors = require('cors');


const connection = require('./bin/config');
connection.once('open', () => console.log('Connection to DB Established'));
connection.on('error', () => console.log('Error'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/api' ,indexRouter);

module.exports = app;
