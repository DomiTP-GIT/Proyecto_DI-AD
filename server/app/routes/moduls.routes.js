const tokens = require("../config/tokens");
module.exports = app => {
    const moduls = require("../controllers/moduls.controllers.js");
    const jwt = require('jsonwebtoken');
    const bodyParser = require('body-parser');

    const authenticateJWT = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, tokens.ACCESSTOKEN, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    };
    var router = require("express").Router();
    router.get("/", authenticateJWT, moduls.obtener);
    router.get("/:id", authenticateJWT, moduls.obtenerConcreta);

    app.use('/moduls', router);
};
