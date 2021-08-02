const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
    slug:{
        type: String
    },
    originalURL:{
        type: String
    }
}, { collection: 'short_url'});

module.exports = mongoose.model('short_url', shortUrlSchema)