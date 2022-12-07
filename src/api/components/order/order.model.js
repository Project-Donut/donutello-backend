const mongoose = require('mongoose');

const { addressSchema } = require('../address.schema');
const { customerSchema } = require('../customer.schema');

const dataSchema = new mongoose.Schema({
    address: {
        required: true,
        type: addressSchema,
    },
    customer: {
        required: true,
        type: customerSchema
    },
    // order: null,
    count: {
        required: true,
        type: Number
    },
    dateBy: {
        required: true,
        type: Date,
    },
    status: {
        required: true,
        type: String,
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', dataSchema)