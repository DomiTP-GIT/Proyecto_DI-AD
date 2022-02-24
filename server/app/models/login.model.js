const sql = require("./db.js");
// constructor
const Login = function(server) {
    this.id = server.id;
    this.username = server.username;
};

Login.isProfesor = (username, result) => {
    sql.query(`SELECT count(*) FROM professor WHERE id_profe = ${username}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Server with the id
        result({ kind: "not_found" }, null);
    });
};

Login.login = (username, password, result) => {
    sql.query(`SELECT id FROM users WHERE username = '${username}' and password = '${password}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Server with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Login;
