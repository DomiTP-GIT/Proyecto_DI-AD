const Notes = require("../models/notes.model.js");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const tokens = require("../config/tokens");

exports.obtener = (req, res) => {
    if (req.user.role != 'alumne') {
        res.status(400).send('No eres alumne')
    } else {
        Notes.getAll(req.user.user_id, (err, data) => {
            if (err){
                return res.status(500).json({ok: false, failed: err})
            }
            console.log(data)
            res.status(200).json({
                ok: true,
                data: data
            });
        })
    }
}

exports.obtenerConcreta = (req, res) => {
    if (req.user.role != 'alumne') {
        res.status(400).send('No eres alumne')
    } else {
        Notes.findById(req.params.id, req.user.user_id, (err, data) => {
            if (err){
                return res.status(500).json({ok: false, failed: err})
            }
            console.log(data)
            res.status(200).json({
                ok: true,
                data: data
            });
        })
    }

}




