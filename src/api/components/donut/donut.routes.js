const { Router } = require("express");
const { DonutController } = require("./donut.controller");

class DonutRoutes {
    controller = new DonutController();
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get("/", this.controller.getDonuts);
        this.router.get("/:id", this.controller.getDonutByID);
        this.router.post("/", this.controller.createDonut);
        this.router.put("/:id", this.controller.updateDonut);
        this.router.delete("/:id", this.controller.deleteDonut);
    }
}

module.exports = {
    DonutRoutes,
};
