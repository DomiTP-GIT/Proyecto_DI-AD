const sql = require("./db.js");
// constructor
const Moduls = function (n) {
    this.id_assig = n.id_assig;
    this.cod_assig = n.cod_assig;
    this.nom_assig = n.nom_assig;
    this.modul = n.modul;
    this.curs = n.curs;
    this.hores = n.hores;
};

Moduls.getAll = (id_alu, result) => {
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

Moduls.getProfeModuls = (id_profe, result) => {
    let query = `SELECT a.* FROM assignatura as a, notes as n WHERE n.id_profe = ${id_profe} and n.id_assig = a.id_assig`;
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


module.exports = Moduls;
