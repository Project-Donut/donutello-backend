const mongoose = require('mongoose');
const { addressSchema } = require('./address.schema');

const customerSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
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
        type: addressSchema
    }
});

module.exports = {
    customerSchema
}