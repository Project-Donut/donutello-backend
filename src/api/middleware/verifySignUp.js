const User = require("../components/user/user.model");
const ROLES = require("../components/role/role.model");
const { ApiResult } = require("../JSend");

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        username: req.body.username,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use!",
            });
            return;
        }

        // Email
        User.findOne({
            email: req.body.email,
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use!",
                });
                return;
            }

            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            console.log(Role);
            throw new Error("NotImplemented");
        }
    }

    next();
};

module.exports = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
};
