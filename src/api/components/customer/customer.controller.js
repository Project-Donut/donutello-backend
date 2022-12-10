const Customer = require("./customer.model");
const { ApiResult } = require("../../JSend");

class CustomerController {
    getCustomerByID(req, res) {
        Customer.findById(req.params.id, (error, data) => {
            if (error) {
                res.status(500).send(new ApiResult("error", null, JSON.stringify(error)));
            } else {
                res.status(200).json(new ApiResult("success", data));
            }
        });
    }
    getCustomers(req, res) {
        Customer.find(req.query, (error, data) => {
            if (error) {
                res.status(500).send(new ApiResult("error", null, JSON.stringify(error)));
            } else {
                res.status(200).json(new ApiResult("success", data));
            }
        });
    }
    async createCustomer(req, res) {
        try {
            const data = new Customer({
                ...req.body
            });
            console.log(req.body);
            const savedData = await data.save();
            res.status(200).json(new ApiResult("success", savedData));
        } catch (error) {
            res.status(500).send(new ApiResult("error", null, JSON.stringify(error)));
        }
    }
    async updateCustomer(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const options = { new: true };
            const updatedData = await Customer.findByIdAndUpdate(id, data, options);
            res.status(200).json(new ApiResult("success", updatedData));
        } catch (error) {
            res.status(500).send(new ApiResult("error", null, JSON.stringify(error)));
        }
    }
    async deleteCustomer(req, res) {
        try {
            const id = req.params.id;
            const deletedData = await Customer.findByIdAndDelete(id);
            res.status(200).json(new ApiResult("success", deletedData));
        } catch (error) {
            res.status(500).send(new ApiResult("error", null, JSON.stringify(error)));
        }
    }
}

module.exports = {
    CustomerController,
};
