const mongoose = require('mongoose');

const User = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    }, 
    Password: {
        type: String,
        required: true
    },
    Google: {
        type: Boolean,
        required: true
    },
    CompanyID: {
        type: String,
        required: true
    },
    Picture: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model('Users', User);