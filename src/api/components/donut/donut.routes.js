const { Router } = require("express");
const { DonutController } = require("./donut.controller");
const { verifyToken, isAdmin, isModerator } = require("../../middleware/authJwt");

class DonutRoutes {
    controller = new DonutController();
    router = Router();

    constructor() {
        this.initRoutes();
    }

    initRoutes() {
        this.router.get("/",[verifyToken, isModerator], this.controller.getDonuts);
        this.router.get("/:id",[verifyToken, isModerator], this.controller.getDonutByID);
        this.router.post("/", this.controller.createDonut);
        this.router.put("/:id", [verifyToken, isModerator],this.controller.updateDonut);
        this.router.delete("/:id",[verifyToken, isAdmin], this.controller.deleteDonut);
    }
}

module.exports = {
    DonutRoutes,
};
