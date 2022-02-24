const tokens = require("../config/tokens");
module.exports = app => {
    const login = require("../controllers/login.controllers.js");
    const jwt = require('jsonwebtoken');
    const bodyParser = require('body-parser');

    var router = require("express").Router();
    router.post("/", login.login);
    app.use('/login', router);
};
