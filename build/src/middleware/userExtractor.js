"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userExtractorUser = exports.userExtractorAdmin = void 0;
const enum_1 = require("../enum");
const jwt = require('jsonwebtoken');
const userExtractorAdmin = (req, res, next) => {
    console.log(req.get('authorization'));
    // console.log(req)
    // tipo de usuario almacenado en el enum
    var { Administrator } = enum_1.TypeUser;
    // se extrae el token desde header
    const authorization = req.get('authorization');
    if (!authorization) {
        return res.status(404).json({ error: "Token no encontrado" });
    }
    // si hay token se guarda en token
    let token = null;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }
    console.log('este es el token ', token);
    // decodifica el token para tener la informacion del usuario
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    console.log("este es el decoded token", decodedToken);
    // si no hay token ó el tipo de usuario es distinto a "Administrator" devolvera un error
    if (!token || decodedToken.type_user !== Administrator) {
        return res.status(404).json({ error: "Error: Accesso denegado, token invalido" });
    }
    // si todo esta ok seguira con la funcion.
    return next();
};
exports.userExtractorAdmin = userExtractorAdmin;
const userExtractorUser = (req, res, next) => {
    // se extrae el token desde header
    const authorization = req.get('Authorization');
    // si hay token se guarda en token
    let token = null;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }
    // decodifica el token para tener la informacion del usuario
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    // si no hay token ó el tipo de usuario es distinto a "Administrator" devolvera un error
    if (!token || !decodedToken.id) {
        return res.status(404).json({ error: "Error: Accesso denegado, token invalido" });
    }
    req.params.id = decodedToken.id;
    // si todo esta ok seguira con la funcion.
    return next();
};
exports.userExtractorUser = userExtractorUser;
