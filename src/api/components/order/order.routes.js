const { Router } = require("express");
const { OrderController } = require("./order.controller");
const { verifyToken, isAdmin, isModerator } = require("../../middleware/authJwt");

class OrderRoutes {
    controller = new OrderController();
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get("/", [verifyToken, isModerator], this.controller.getOrder);
        this.router.get("/:id", [verifyToken], this.controller.getOrderByID);
        this.router.post("/", this.controller.createOrder);
        this.router.put("/:id", [verifyToken], this.controller.updateOrder);
        this.router.delete("/:id", [verifyToken], this.controller.cancelOrder);
    }
}

module.exports = {
    OrderRoutes,
};
