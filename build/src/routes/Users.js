"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// se requiere el models
const express_1 = require("express");
const Users_1 = require("../controllers/Users");
const db_1 = require("../db");
const router = (0, express_1.Router)();
//* README *
//* GET http://localhost:3001/users = trae todos los usuarios (solo informacion)
//* GET http://localhost:3001/users?id=1 = pide Usuario ID: 1 (informacion + carrito + favoritos)
//* GET http://localhost:3001/users?username=jesner = pide Usuario username: jesner (informacion + carrito + favoritos)
//* GET http://localhost:3001/users?email=jesner631@gmail.com = pide Usuario email: correo@corre.com (informacion + carrito + favoritos)
//* POST http://localhost:3001/users = mandar datos es por body, ejemplo ↓
//* {
//*   "username": "Usuario",        (No se repite) [string]
//*   "password": "Contraseña",                    [string]
//*   "email": "Correo",            (No se repite) [string]
//*   "name": "Nombres",                           [string]
//*   "last_name": "Apellidos",                    [string]
//*   "birth_date":"1994/05/13"                    [string] respetar formato, [año/mes/dia]
//*   "phone": "Cel o Telf",                       [string]
//*   "identification": DNI,        (No se repite) [integer]
//*   "type_user": "Administrator",                [string: enum] ('Administrator', 'Employee', 'User')
//* }
//* PUT http://localhost:3001/users = mandar datos es por body, solo mandar lo que se va actualizar, ejemplo ↓
//* {
//*   "id": 3,                      (ID del usuario)
//*   "name": "Nombres nuevos"
//*   "last_name": "Apellidos nuevos",
//*   "phone": "Cel o Telf Nuevos"
//* }
//* DELETE http://localhost:3001/users = mandar datos es por body, solo mandar el id del usuario a eliminar, ejemplo ↓
//* NOTA: El usuario no se elimina, solo es baja logica, "isActive": false.
//* {
//*   "id": 3,                      (ID del usuario)
//* }
// TODO => Pide un usuarios por id || username, email.
//* Si no se manda nada trae todos los usuarios.
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var users = yield (0, Users_1.getAllValuesUsers)(req.query);
        res.json(users);
    }
    catch (e) {
        next(e);
    }
}));
router.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var nUser = yield (0, Users_1.createUsers)(req.body);
        res.json(nUser);
    }
    catch (e) {
        next(e);
    }
}));
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Number(req.body.identification);
        var putUser = yield (0, Users_1.updateUser)(req.body);
        res.json(putUser);
    }
    catch (e) {
        res.json({ error: e.message });
    }
}));
router.put("/password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var putUser = yield (0, Users_1.updatePassword)(req.body);
        res.json(putUser);
    }
    catch (e) {
        res.json({ error: e.message });
    }
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var delUser = yield (0, Users_1.deleteUser)(req.body.id);
        res.json(delUser);
    }
    catch (e) {
        res.json({ error: e.message });
    }
}));
// DELETE ----> http:localhost:3001/users/delete/:id
// se ingresa por params el id del usuario a eliminar
// !! Atencion, es eliminacion fisica, solo para valientes.
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield db_1.Users.findByPk(id);
        if (user) {
            yield user.destroy();
            res.json(user);
        }
        else {
            res.status(404).json({ error: "User inexistent" });
        }
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
}));
//!====================================================
//!===================CART_DETAILS=====================
//!====================================================
router.get("/cart/:idUser", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser } = req.params;
    try {
        var cart = yield (0, Users_1.getCart)(parseInt(idUser));
        res.json(cart);
    }
    catch (e) {
        next(e);
    }
}));
router.post("/cart", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var cart = yield (0, Users_1.addToCart)(req.body);
        res.json(cart);
    }
    catch (e) {
        next(e);
    }
}));
router.put("/cart", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var cart = yield (0, Users_1.updateCart)(req.body);
        res.json(cart);
    }
    catch (e) {
        next(e);
    }
}));
router.delete("/cart", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var delCart = yield (0, Users_1.deleteCart)(req.body);
        res.json(delCart);
    }
    catch (e) {
        next(e);
    }
}));
router.delete("/cart/all", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var delCart = yield (0, Users_1.allDeleteCart)(req.body);
        res.json(delCart);
    }
    catch (e) {
        next(e);
    }
}));
//!=========================================================================
//* FAVORITES
router.get("/favs/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var nUser = yield (0, Users_1.getFavourites)(req.params.id);
        res.json(nUser);
    }
    catch (e) {
        res.status(404).json({ error: e.message });
    }
}));
router.post("/favs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var nUser = yield (0, Users_1.addFavourites)(req.body);
        res.json(nUser);
    }
    catch (e) {
        res.status(404).json({ error: e.message });
    }
}));
router.delete("/favs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var nUser = yield (0, Users_1.deleteFavourite)(req.body);
        res.json(nUser);
    }
    catch (e) {
        res.status(404).json({ error: e.message });
    }
}));
exports.default = router;
