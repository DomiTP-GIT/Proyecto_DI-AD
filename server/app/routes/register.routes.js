module.exports = app => {
    const register = require("../controllers/register.controllers.js");
    const jwt = require('jsonwebtoken');
    const bodyParser = require('body-parser');

    var router = require("express").Router();
    router.post("/", register.register);

    app.use('/register', router);
};
