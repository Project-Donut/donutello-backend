const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    icingFlavour: {
        required: true,
            type: String,
            enum: ['Aardbei','Chocolade','Snickers','Oreo','Limoen','Kokos','Kersen','Pistache',],
            default: "Chocolade",
    },
    toppingType: {
        required: true,
        type: String,
        enum: ['Sprinkles','Crumble','Flakes','Geen',],
        default: "Sprinkles",},
    toppingColour: {
        required: false,
        type: String,
        enum: ['Roze','Wit','Bruin','Geen'],
        default: "Wit",
    },
    crumbleFlavour: {
        required: false,
            type: String,
            enum: ['Snickers','Oreo','Kokos','Pistache','Geen'],
            default: "Snickers",
    },
    fillingFlavour: {
        required: true,
        type: String,
        enum: ['Pudding','Rijstpap','Nutella','Willekeurig','Geen'],
        default: "Geen",
    },
    logoImage: {
        required: false,
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Donut', dataSchema)