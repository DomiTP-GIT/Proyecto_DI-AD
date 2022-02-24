const express = require("express");
const cors = require("cors");
const https = require('https');
const fs = require('fs');
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

const PORT = 8090;

const app = express();
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// simple route
app.get("/", (req, res) => {
    res.json({message: "DI - AD APP"});
});

require("./app/routes/login.routes.js")(app);
require("./app/routes/register.routes.js")(app);
require("./app/routes/notes.routes.js")(app);
require("./app/routes/moduls.routes.js")(app);

https.createServer({
    key: fs.readFileSync('./app/certs/my_cert.key'),
    cert: fs.readFileSync('./app/certs/my_cert.crt')
}, app).listen(PORT, function(){
    console.log("Servidor HTTPS escoltant al port " + PORT + " ...");
});

