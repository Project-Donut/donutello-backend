const Order = require("./order.model");
const { ApiResult } = require("../../JSend");
const { leveledSort, paginate } = require("../../../utils/sort");
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
        let skip = (Number)(req.query.skip) || 0;
        let limit = (Number)(req.query.limit) || 10;
        let sort = req.query.sort || 'status'; 
        let order = req.query.order || -1;
        let mongoSort = [[sort, (Number)(order)]];
        if (mongoSort[0][0] !== "dateBy") {
            mongoSort = [
                ["dateBy", 1],
                ...mongoSort
            ];
        }
        // Filter from query;
        let mongoFilter = {
            $or: [
                { status: "100 - pending" },
                { status: "200 - processing" },
                { status: "300 - shipped" },
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
            .populate('customer')
            .exec(function(error, data) {
                if (error) {
                    res.status(500).send(new ApiResult("error", null, error));
                } else {
                    for (let sort in mongoSort) {
                        sort = mongoSort[sort];
                        data.sort((a, b) => {
                            return leveledSort(sort[0], a, b, sort[1]);
                        });
                    }
                    const totalRecords = data.length;
                    data = paginate(data, limit, skip);
                    const response = {
                        totalRecords,
                        orders: data
                    }
                    res.status(200).json(new ApiResult("success", response));
                }
            });
    }
    async createOrder(req, res) {
        try {
            const data = new Order({
                ...req.body,
                status: "100 - pending",
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
