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
const Address_1 = require("../controllers/Address");
const express_1 = require("express");
const userExtractor_1 = require("../middleware/userExtractor");
//Breve Documentacion:
// Ruta GET/address --> Trae todas las direcciones asociadas al usuario que hace la peticion,
// se toma el id del token que envia en la peticion.
// Ruta POST/address/--> No hace falta enviar el ID del usuario, se lo toma de la autenticacion del token.
// Se debe enviar por body en formato JSON con la siguiente estructura:
// {
//   "title": "Casita",
//   "address": "Barrio siglo 20 mza 30 lote 53",
//   "city": "Santiago del Estero",
//   "state": "Santiago del Estero",
//   "country": "Argentina",
//   "zip_code": "4200"
// }
// Ruta PATCH/ --> Se debe enviar por Body el id de la direccion (address) que se quiera modificar del usuario
//
// Tambien deben ir los demas atributos en el body que se quieran modificar: (title, address, city, state, country, zip_code)
// {
//   "id":1,
//   "title": "casota 2"
// }
//Ruta DELETE/category --> se envia por body un objeto con id de la direccion a eliminar ("logicamente")
// Ejemplo:
// {
//     id:1,
// }
const Address = (0, express_1.Router)();
Address.get("/", userExtractor_1.userExtractorUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let addresses = yield (0, Address_1.getAddress)(req.params.id);
        res.json(addresses);
    }
    catch (e) {
        next(e);
    }
}));
Address.post("/", userExtractor_1.userExtractorUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postedAddress = yield (0, Address_1.postAddress)(req.params.id, req.body);
        if (postedAddress) {
            res.json(postedAddress);
        }
    }
    catch (e) {
        next(e);
    }
}));
Address.patch("/", userExtractor_1.userExtractorUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patchedAddress = yield (0, Address_1.patchAddress)(req.body);
        if (patchedAddress) {
            res.json(patchedAddress);
        }
    }
    catch (e) {
        next(e);
    }
}));
Address.delete("/", userExtractor_1.userExtractorUser, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedAddress = yield (0, Address_1.deleteAddress)(req.body);
        if (deletedAddress) {
            res.json(deletedAddress);
        }
    }
    catch (e) {
        next(e);
    }
}));
exports.default = Address;
