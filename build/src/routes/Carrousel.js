'use strict';
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
const Carrousel_1 = require("../controllers/Carrousel");
const userExtractor_1 = require("../middleware/userExtractor");
const router = (0, express_1.Router)();
//* README *
//* LAS OPCIONES DE AGREGAR, ACTUALIZA, ELIMINAR, SOLO ESTAN DISPONIBLES PARA EL USUARIO DE NIVEL ADMINISTRADOR
//* GET http://localhost:3001/carrousel/ = Lista de todas las imagenes para el carrousel [Slider] (isActive=true)
//* NOTA: Es un Array de objetos. ejemplo ↓
//* [
//*   {
//*     "id": 1,
//*     "image": "foTO2",
//*     "isActive": true
//*   },
//*   {
//*     "id": 2,
//*     "image": "foTO3",
//*     "isActive": true
//*   }
//* ]
//* GET http://localhost:3001/carrousel/all = Lista de todas las imagenes para el carrousel [Slider] (isActive=true y isActive=false)
//* POST http://localhost:3001/carrousel = Envio por BODY[req.body], ejemplo ↓
//* NOTA: agregar imagenes sera por formulario cuando queramos agregar imagenes del producto.
//* NOTA: Ojo!, mandarlo como array de objetos.
//* {
//*   "imagen": "link_de_la_imagen1",        (No se repite) [string]
//* }
//* NOTA: Si queremos agregar varias imagenes al azar, ejemplo ↓, como notan es un array
//* NOTA: Ojo!, mandarlo como array de objetos.
//* [
//*   {
//*     "imagen": "link_de_la_imagen2",        (No se repite) [string]
//*   },
//*   {
//*     "imagen": "link_de_la_imagen3",        (No se repite) [string]
//*   }
//* ]
//* PUT http://localhost:3001/carrousel = mandar datos es por body, solo mandar lo que se va actualizar, ejemplo ↓
//* {
//*   "id": 3,                              (ID de la imagen)
//*   "imagen": "link_de_la_nueva_imagen"
//* }
//* DELETE http://localhost:3001/carrousel = mandar datos es por body, solo mandar el id de la imagen a eliminar, ejemplo ↓
//* NOTA: La imagen no se elimina, solo es baja logica, "isActive": false.
//* {
//*   "id": 3,                              (ID de la imagen)
//* }
// TODO => Lista de todas las imagenes para el carrousel [Slider] (isActive=true)
router.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var carrousel = yield (0, Carrousel_1.getCarrousel)();
        res.status(200).json(carrousel);
    }
    catch (e) {
        next(e);
    }
}));
// TODO => Lista de todas las imagenes para el carrousel [Slider] (isActive=true y isActive=false)
router.get('/all', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var carrouselAll = yield (0, Carrousel_1.getCarrouselAll)();
        res.status(200).json(carrouselAll);
    }
    catch (e) {
        next(e);
    }
}));
// TODO => Envio de datos, ver ejemplo arriba ↑
router.post('/', userExtractor_1.userExtractorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var ncarrousel = yield (0, Carrousel_1.createCarrousel)(req.body);
        res.status(200).json(ncarrousel);
    }
    catch (e) {
        next(e);
    }
}));
// TODO => Actualizacion de datos, ver ejemplo arriba ↑
router.put('/', userExtractor_1.userExtractorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var putcarrousel = yield (0, Carrousel_1.updateCarrousel)(req.body);
        res.status(200).json(putcarrousel);
    }
    catch (e) {
        next(e);
    }
}));
// TODO => Eliminacion de datos, ver ejemplo arriba ↑
router.delete('/', userExtractor_1.userExtractorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var delcarrousel = yield (0, Carrousel_1.deleteCarrousel)(req.body.id);
        res.status(200).json(delcarrousel);
    }
    catch (e) {
        next(e);
    }
}));
exports.default = router;
