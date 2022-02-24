const Login = require("../models/login.model.js");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const tokens = require("../config/tokens");

const refreshTokens = [];

exports.login = (req, res) => {
    // Coger usuario y contraseña del json que nos mandan
    const {username, password} = req.body;
    let role

    // Devuelve el ID del usuario en caso de que el usuario y la contraseña sean correctos
    Login.login(username, password, (err, data) => {
        // Si hay errores, se los mandamos al cliente
        if (err) {
            return res.json({ok: false, failed: 'Usuario o contraseña incorrectos'});
        }
        // Si hay datos, voy a comprobar su rol
        if (data) {
            // Manda una comprobación a la base de datos para comprobar si hay algún registro con la id anterior
            const id = data.id
            Login.isProfesor(id, (err, data) => {
                if (err){
                    return res.json({ok: false, failed: 'Error al comprobar el rol'})
                }
                if (data) {
                    if (data["count(*)"] == 1){
                        role = "profe"
                    } else {
                        role = "alumne"
                    }
                    const accessToken = jwt.sign(
                        {user_id: id, username: username, role: role},
                        tokens.ACCESSTOKEN,
                        {expiresIn: '2h'}
                    );
                    const refreshToken = jwt.sign(
                        {user_id: id, username: username, role: role},
                        tokens.REFRESHTOKEN
                    );
                    refreshTokens.push(refreshToken);
                    res.status(200).json({
                        ok: true,
                        data: {
                            token: accessToken,
                            refreshToken: refreshToken
                        }
                    });
                }
            })
        }
    })
}
