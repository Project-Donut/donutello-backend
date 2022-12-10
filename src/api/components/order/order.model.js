const mongoose = require("mongoose");

const { addressSchema } = require("../address.schema");
const { customerSchema } = require("../customer.schema");

const dataSchema = new mongoose.Schema(
    {
        address: {
            required: true,
            type: addressSchema,
        },
        customer: {
            required: true,
            type: customerSchema,
        },
        // order: null,
        count: {
            required: true,
            type: Number,
        },
        dateBy: {
            required: true,
            type: Date,
        },
        status: {
            required: true,
            type: String,
            enum: [
                "pending",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
            ],
            default: "pending",
        },
    },
    { timestamps: true }
);

dataSchema.virtual("priority").get(function() {
    switch (this.status) {
        case "pending":
            return 0;
        case "processing":
            return 100;
        case "shipped":
            return 200;
        case "delivered":
            return 300;
        case "cancelled":
            return -100;
        default:
            return -999;
    }
});

dataSchema.set("toJSON", { virtuals: true });
dataSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("Order", dataSchema);
