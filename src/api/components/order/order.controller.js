const Order = require("./order.model");
const { ApiResult } = require("../../JSend");

class OrderController {
    getOrderByID(req, res) {
        Order.findById(req.params.id, (error, data) => {
            if (error) {
                res.status(500).send(new ApiResult("error", null, error));
            } else {
                res.status(200).json(new ApiResult("success", data));
            }
        });
    }
    getOrder(req, res) {
        // Sort from query
        let sort = req.query.sort || 'Priority'; 
        let order = req.query.order || 1;
        let mongoSort = {};
        mongoSort[sort] = order;


        // Filter from query;
        let mongoFilter = {
            $or: [
                { status: "pending" },
                { status: "processing" },
                { status: "shipped" },
            ],
        };
        let filterEntries;
        if (!!req.query.filter) {
            // Cast filter query to JSON string, then to JS object
            filterEntries = JSON.parse(`{"filter":${req.query.filter}}`).filter;
            mongoFilter = { $and: filterEntries};
        }

        // Execute Request
        Order.find(mongoFilter)
            .sort({'dateBy': 1})
            .sort(mongoSort)
            .exec((error, data) => {
                if (error) {
                    res.status(500).send(new ApiResult("error", null, error));
                } else {
                    res.status(200).json(new ApiResult("success", data));
                }
            });
    }
    async createOrder(req, res) {
        try {
            const data = new Order({
                ...req.body,
                status: "pending",
            });
            const savedData = await data.save();
            res.status(200).json(new ApiResult("success", savedData));
        } catch (error) {
            res.status(500).send(new ApiResult("error", null, error));
        }
    }
    async updateOrder(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const options = { new: true };
            const updatedData = await Order.findByIdAndUpdate(
                id,
                data,
                options
            );
            res.status(200).json(new ApiResult("success", updatedData));
        } catch (error) {
            res.status(500).send(new ApiResult("error", null, error));
        }
    }
    async cancelOrder(req, res) {
        try {
            const id = req.params.id;
            const options = { new: true };
            const deletedData = await Order.findByIdAndUpdate(
                id,
                { status: "cancelled" },
                options
            );
            res.status(200).json(new ApiResult("success", deletedData));
        } catch (error) {
            res.status(500).send(new ApiResult("error", null, error));
        }
    }
}

module.exports = {
    OrderController,
};
