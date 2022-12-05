const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    },
    postalCode: {
        required: true,
        type: String
    },
    country: {
        required: true,
        type: String
    }
});

module.exports = {
    addressSchema
}