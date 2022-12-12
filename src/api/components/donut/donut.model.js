const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    icingFlavour: {
        required: true,
            type: String,
            enum: ['Aardbei','Chocolade','Snickers','Oreo','Limoen','Kokos','Kersen','Pistache',],
            default: "Chocolade",
    },
    toppingType: {
        required: false,
        type: String,
        enum: ['Sprinkles','Crumble','Flakes','Geen',],
        default: "Sprinkles",},
    toppingColour: {
        required: false,
        type: String,
        enum: ['Roze','Wit','Bruin'],
        default: "Regenboog",
    },
    crumbleFlavour: {
        required: false,
            type: String,
            enum: ['Snickers','Oreo','Kokos','Pistache',],
            default: "Snickers",
    },
    fillingFlavour: {
        required: false,
        type: String,
        enum: ['Pudding','Rijstpap','Nutella','Willekeurig'],
        default: "Pudding",
    },
    logoImage: {
        required: false,
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Donut', dataSchema)