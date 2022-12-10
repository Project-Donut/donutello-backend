const mongoose = require('mongoose');
const { addressSchema } = require('./address.schema');

const dataSchema = new mongoose.Schema({
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

dataSchema.virtual("fullName").get(function() {
    return this.company || `${this.firstName} ${this.customer.lastName}`;
});

dataSchema.set("toJSON", { virtuals: true });
dataSchema.set("toObject", { virtuals: true });

module.exports = {
    customerSchema: dataSchema
}