const mongoose = require("mongoose");

const { addressSchema } = require("../address.schema");

const dataSchema = new mongoose.Schema(
    {
        address: {
            required: true,
            type: String,
        },
        customer: {
            required: true,
            type: mongoose.Types.ObjectId,
            ref: "Customer",
        },
        count: {
            required: true,
            type: Number,
        },
        dateBy: {
            required: true,
            type: Date,
        },
        image: {
            required: false,
            type: String,
            default: "data:image/webp;base64,UklGRugDAABXRUJQVlA4WAoAAAAIAAAA/gAA/gAAVlA4TOkCAAAv/oA/AF+goG0bhj/etvuHhsK2bZD/7207BoVt2yD/39t2DPMf/x+AqhIRdtfd+X93JzO5u6pSVSA3km3XVs5XqJUBFunxLJLBwtMqAerv6L6+e9ZZ24Mf0X8Ibhs5knyBl2/z9nRX1wMq/UXP/uc/Kfnz05M/P/fJ2w/XlpzeXe+SP2frh8UX6zMSxrUsnNZCEOS6weJCEOQdDhkEeYdDBjHehxdCjPfhhRDiQ2gphPgQWgoRPgYrhggfgxVDgI9DyiHAxyHlUN+n4ARR36fgBFHbp6EkUdunoSRR1yMwoqjrERhR1PQYhCxqegxCFvU8St+jGPJqraNYXOuvIafVwXJiHV9+cRyLPzq/ZmGrkyrPhbjVVaXysNM1pfKw0y1VZWKje6rKBG1z3OVinwcqlQvW7rjbBml73G2DtH3c5YOzf9zlg7N/3G0Esz/vYIQSmHdxAgnMOzlhJObdrBAi825WCJF5Vy8bWCovG1gqM35LZcZvqdw0heLGbqnstKRix22p7LxviMXOpdlS2WnIxY7bUoHQgiFhJdedSVjJoJCi6+4opGhYONm6AxZONjCUcN0FDCUcGka67oSGkQ4OIV53g0OIh6cvX3fE05ePga6GuisDXQ1x0NQQBz0dsdDSEQsdQ/Lp4nA+1gDv8r88wK/lP+4M8Lib/7wzwPNu/rhjgHFX/rhzgHF3/nHHAMdd+cedAxx35887DDDvkj/vNMC8W/684wDzrvnzzgPMu+evOwyw7pK/7jTAulv+uuMA6675684DrLvn1x0MUHeRX3cyQN1Nft3RAHVX+XVnA9Td5dcdDlB3mV93OkDdbX7d8QB11/l15wPU3efvOxhg38Vg+048bnVS5XGr0yqTjhM7wL6z/H138fsO8/ddxu87zd93G7/vOH/fdfy+8/x99/F9B/L7LsT3ncjvuxHfdyS/70p835n8vjvxfYfy+y7F953K77sV33csv+9afN+5/L6Dz/7n3+gIAEVYSUbYAAAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAADEBAgARAAAAZgAAAGmHBAABAAAAeAAAAAAAAABgAAAAAQAAAGAAAAABAAAAcGFpbnQubmV0IDQuMy4xMgAABQAAkAcABAAAADAyMzABoAMAAQAAAAEAAAACoAQAAQAAAP8AAAADoAQAAQAAAP8AAAAFoAQAAQAAALoAAAAAAAAAAgABAAIABAAAAFI5OAACAAcABAAAADAxMDAAAAAA"
        },
        status: {
            required: true,
            type: String,
            enum: ['100 - pending', '200 - processing', '300 - shipped', '400 - delivered', '000 - cancelled'],
            default: "100 - pending",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", dataSchema);
