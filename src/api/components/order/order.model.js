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

const dataSchema = new mongoose.Schema({
    address: {
        required: true,
        type: addressSchema,
    },
    customer: {
        required: true,
        type: customerSchema
    },
    order: null,
    count: {
        required: true,
        type: Number
    },
    status: {
        required: true,
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', dataSchema)