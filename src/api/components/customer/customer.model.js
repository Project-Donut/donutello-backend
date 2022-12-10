const mongoose = require('mongoose');
const { addressSchema } = require('../address.schema');

const dataSchema = new mongoose.Schema({
    fullName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    phone: {
        required: false,
        type: String
    },
    company: {
        required: false,
        type: String
    },
    billingAddress: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model("Customer", dataSchema);