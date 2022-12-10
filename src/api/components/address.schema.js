const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
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

dataSchema.virtual("fullAddress").get(function() {
    return `${this.street}, ${this.postalCode} ${this.city}, ${this.country}`;
});

dataSchema.set("toJSON", { virtuals: true });
dataSchema.set("toObject", { virtuals: true });

module.exports = {
    addressSchema: dataSchema
}