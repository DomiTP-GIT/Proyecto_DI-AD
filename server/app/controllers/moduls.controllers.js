const Moduls = require("../models/moduls.model.js");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const tokens = require("../config/tokens");

exports.obtener = (req, res) => {
    if (req.user.role != 'profe') {
        res.status(400).send('No eres professor')
    } else {
        Moduls.getProfeModuls(req.user.user_id, (err, data) => {
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
    Moduls.findById(req.params.id, req.user.user_id, (err, data) => {
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




