const express = require("express");
const cors = require("cors");
const https = require('https');
const fs = require('fs');

const PORT = 5555;

const app = express();

// parse requests of content-type - application/json

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));
// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to bezkoder application."});
});

require("./app/routes/tutorial.routes.js")(app);

https.createServer({
    key: fs.readFileSync('./app/certs/my_cert.key'),
    cert: fs.readFileSync('./app/certs/my_cert.crt')
}, app).listen(PORT, function(){
    console.log("Servidor HTTPS escoltant al port " + PORT + " ...");
});

