const { Router } = require("express");
const { CustomerController } = require("./customer.controller");
const { verifyToken, isModerator } = require("../../middleware/authJwt");

class CustomerRoutes {
    controller = new CustomerController();
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get("/", [verifyToken, isModerator], this.controller.getCustomers);
        this.router.get("/:id", [verifyToken], this.controller.getCustomerByID);
        this.router.post("/", this.controller.createCustomer);
        this.router.put("/:id", [verifyToken], this.controller.updateCustomer);
        this.router.delete("/:id", [verifyToken], this.controller.deleteCustomer);
    }
}

module.exports = {
    CustomerRoutes,
};
