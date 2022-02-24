const { Register } = require("../models/register.model.js");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const tokens = require("../config/tokens");
const {Profesor, Alumne} = require("../models/register.model");

const refreshTokens = [];


exports.register = (req, res) => {
    // Coger usuario y contraseña del json que nos mandan
    const {dni, username, password, full_name} = req.body;

    if (dni == null || username == null || password == null || full_name == null) {
        return res.status(400).json({ok: false, failed: 'Ninguno de los datos puede ser nulo'})
    }

    // Comprobar si existe el usuario en la base de datos
    Register.findByUsername(username, (err, data) => {
        if (err) {
            return res.status(400).json({ok: false, failed: 'Error al consultar si el usuario existe'});
        }

        if (data) {
            // Si devuelve 1 es que ya hay un usuario con ese username
            if (data["count(*)"] == 1) {
                return res.status(404).json({ok: false, failed: 'El usuario ya existe en la base de datos'});
            } else {
                // En caso de que no lo haya, procedo a crear una constante que almacenará la información del usuario para luego registrarlo
                const user = new Register({
                    username: req.body.username,
                    password: req.body.password,
                    full_name: req.body.full_name,
                    avatar: req.body.avatar
                });

                // Ahora, voy a comprobar si el DNI es de un profesor o no
                Register.isProfesor(dni, (err, data) => {
                    if (err) {
                        return res.status(500).json({ok: false, failed: 'Error al comprobar el DNI del usuario'});
                    }

                    if (data) {
                        // Almaceno si es de un profesor o no
                        const isProfe = data["count(*)"] == 1;

                        // Registro al usuario
                        Register.register(user, (err, data) => {
                            if (err) {
                                return res.status(500).json({ok: false, failed: 'Error al registrar al usuario'});
                            }
                            if (data) {
                                // Guardo el id que me devuelve al hacer la consulta
                                const id = data.id;
                                // Si es profesor, le registro como profesor
                                if (isProfe) {
                                    // Objeto que almacena los datos
                                    const profe = new Profesor({
                                        id_profe: id,
                                        departament: null
                                    })
                                    // Añadirlo a profesores
                                    Register.registerProfessor(profe, (err, data) => {
                                        if (err) {
                                            return res.status(500).json({ok: false, failed: 'Error al insertar al profesor'});
                                        }
                                        if (data) {
                                            // Si todo sale bien, le mando el token
                                            const accessToken = jwt.sign({
                                                user_id: id,
                                                username: username,
                                                role: isProfe ? 'profe' : 'alumne'
                                            }, tokens.ACCESSTOKEN, {expiresIn: '2h'});
                                            const refreshToken = jwt.sign({
                                                user_id: id,
                                                username: username,
                                                role: isProfe ? 'profe' : 'alumne'
                                            }, tokens.REFRESHTOKEN);
                                            refreshTokens.push(refreshToken);
                                            return res.status(200).json({
                                                ok: true,
                                                data: {
                                                    token: accessToken, refreshToken: refreshToken
                                                }
                                            });
                                        }
                                    })
                                } else {
                                    // Si no es profesor, lo añado a alumnos
                                    const alumne = new Alumne({
                                        id_alumne: id,
                                        repetidor: null,
                                        curs: null
                                    })
                                    Register.registerAlumne(alumne, (err, data) => {
                                        if (err) {
                                            return res.status(500).json({ok: false, failed: 'Error al insertar al alumno'});
                                        }
                                        if (data) {
                                            // Si todo sale bien, le mando el token
                                            const accessToken = jwt.sign({
                                                user_id: id,
                                                username: username,
                                                role: isProfe ? 'profe' : 'alumne'
                                            }, tokens.ACCESSTOKEN, {expiresIn: '2h'});
                                            const refreshToken = jwt.sign({
                                                user_id: id,
                                                username: username,
                                                role: isProfe ? 'profe' : 'alumne'
                                            }, tokens.REFRESHTOKEN);
                                            refreshTokens.push(refreshToken);
                                            return res.status(200).json({
                                                ok: true,
                                                data: {
                                                    token: accessToken, refreshToken: refreshToken
                                                }
                                            });
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            }
        }
    })
}
