const sql = require("./db.js");
// constructor
const Notes = function (n) {
    this.id_alumne = n.id_alumne;
    this.id_profesor = n.id_profesor;
    this.id_assig = n.id_assig;
    this.cod_assig = n.cod_assig;
    this.nota = n.nota;
};

Notes.getAll = (id_alu, result) => {
    let query = `SELECT n.*, a.cod_assig FROM notes as n, assignatura as a WHERE n.id_alumne = ${id_alu} and n.id_assig=a.id_assig`;
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

Notes.findById = (id_assig, id_alu, result) => {
    let query = `SELECT n.*, a.cod_assig FROM notes as n, assignatura as a WHERE n.id_alumne = ${id_alu} and n.id_assig=${id_assig} and a.id_assig=${id_assig}`;
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        // not found Server with the id
        result({ kind: "No se ha encontrado" }, null);
    });
};


module.exports = Notes;
