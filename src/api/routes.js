let { UserRoutes } = require("./components/user/user.routers");
/**
 * Init Express REST routes
 *
 * @param {Express} app
 * @returns {void}
 */
function initiateRouter(app) {
    const prefix = "/api/v1";

    app.get("/", (req, res) => {
        res.sendStatus(200);
    });
    app.get(prefix, (req, res) => res.send("PING"));

    app.use(`${prefix}/user`, new UserRoutes().router);
}
module.exports = {
    initiateRouter,
};
