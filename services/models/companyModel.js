const mongoose = require('mongoose');

const Company = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    CompanyName: {
        type: String,
        required: true
    },
    Locations: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model('Companies', Company);