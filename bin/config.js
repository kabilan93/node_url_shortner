const mongoose = require('mongoose');
require('dotenv').config()

DB_User = process.env.DB_User;
DB_password = process.env.DB_password;

const DB_CONNECTION = `mongodb+srv://${DB_User}:${DB_password}@cluster0.zqqpg.mongodb.net/dev?retryWrites=true&w=majority`;

mongoose.connect(DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;

module.exports = connection;