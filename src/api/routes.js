let { UserRoutes } = require("./components/user/user.routes");
let { AuthRoutes } = require("./components/auth/auth.routes");
let { OrderRoutes } = require("./components/order/order.routes");
let { CustomerRoutes } = require("./components/customer/customer.routes");
/**
 * Init Express REST routes
 *
 * @param {Express} app
 * @returns {void}
 */
function initiateRouter(app) {
    const prefix = "/api/v1";

    app.get("/", (req, res) => {
        res.status(200).send("OK");
    });
    app.get(prefix, (req, res) => res.send("PING"));

    app.use(`${prefix}/user`, new UserRoutes().router);
    app.use(`${prefix}/auth`, new AuthRoutes().router);
    app.use(`${prefix}/order`, new OrderRoutes().router);
    app.use(`${prefix}/customer`, new CustomerRoutes().router);
}
module.exports = {
    initiateRouter,
};
