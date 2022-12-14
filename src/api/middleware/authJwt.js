const jwt = require("jsonwebtoken");
const User = require("../components/user/user.model");
const Role = require("../components/role/role.model");
const { ApiResult } = require("../JSend");

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No token provided!" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user === null) {
            res.status(500).json(new ApiResult("user not found", null, null));
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Require Admin Role!" });
                return;
            }
        );
    });
};

const isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user === null) {
            res.status(500).json(new ApiResult("user not found", null, null));
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (
                        roles[i].name === "moderator" ||
                        roles[i].name === "admin"
                    ) {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Require Moderator Role!" });
                return;
            }
        );
    });
};

const isUser = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (user === null) {
            res.status(500).json(new ApiResult("user not found", null, null));
            return;
        }

        Role.find(
            {
                _id: { $in: user.roles },
            },
            (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (
                        roles[i].name === "user" ||
                        roles[i].name === "moderator" ||
                        roles[i].name === "admin"
                    ) {
                        next();
                        return;
                    }
                }

                res.status(403).send({ message: "Require User Role!" });
                return;
            }
        );
    });
};

module.exports = {
    verifyToken,
    isAdmin,
    isModerator,
    isUser,
};
