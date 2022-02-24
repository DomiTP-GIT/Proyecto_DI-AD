const tokens = require("../config/tokens");
module.exports = app => {
    const notes = require("../controllers/notes.controllers.js");
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
    router.get("/", authenticateJWT, notes.obtener);
    router.get("/:id", authenticateJWT, notes.obtenerConcreta);

    app.use('/notes', router);
};
