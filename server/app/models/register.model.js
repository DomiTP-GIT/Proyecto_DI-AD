const sql = require("./db.js");
// constructor
const Register = function(server) {
    this.username = server.username;
    this.password = server.password;
    this.full_name = server.full_name;
    this.avatar = server.avatar;
};

const Profesor = function (server) {
    this.id_profe = server.id_profe;
    this.departament = server.departament;
}

const Alumne = function (server) {
    this.id_alumne = server.id_alumne;
    this.repetidor = server.repetidor;
    this.curs = server.curs;
}

Register.findByUsername = (username, result) => {
    sql.query(`SELECT count(*) FROM users WHERE username = '${username}'`, (err, res) => {
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

Register.isProfesor = (dni, result) => {
    sql.query(`SELECT count(*) FROM dni_profe WHERE dni = '${dni}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found dni: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Server with the id
        result({ kind: "not_found" }, null);
    });
};

Register.register = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

Register.registerProfessor = (newUser, result) => {
    sql.query("INSERT INTO professor SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created professor: ", {...newUser });
        result(null, {...newUser });
    });
};

Register.registerAlumne = (newUser, result) => {
    sql.query("INSERT INTO alumne SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created alumne: ", { ...newUser });
        result(null, {...newUser });
    });
};


module.exports = { Register, Profesor, Alumne };
