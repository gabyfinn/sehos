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
const Sizes_1 = require("../controllers/Sizes");
const userExtractor_1 = require("../middleware/userExtractor");
const router = (0, express_1.Router)();
//* README *
//* LAS OPCIONES DE AGREGAR, ACTUALIZA, ELIMINAR, SOLO ESTAN DISPONIBLES PARA EL USUARIO DE NIVEL ADMINISTRADOR
//* GET http://localhost:3001/products/details/sizes = Lista de todos los colores para los productos (isActive=true)
//* NOTA: Es un Array de objetos. ejemplo ↓
//* [
//*   {
//*       "id": 1,
//*       "size": "M",
//*       "isActive": true
//*   },
//*   {
//*       "id": 2,
//*       "size": "s",
//*       "isActive": true
//*   }
//* ]
//* GET http://localhost:3001/products/details/sizes/all = Lista de todas las imagenes para el carrousel [Slider] (isActive=true y isActive=false)
//* POST http://localhost:3001/products/details/sizes = Envio por BODY[req.body], ejemplo ↓
//* NOTA: agregar imagenes sera por formulario cuando queramos agregar imagenes del producto.
//* NOTA: Ojo!, mandarlo como objeto.
//* {
//*   "size": "talla",        (No se repite) [string]
//* }
//* NOTA: Si queremos agregar varias imagenes al azar, ejemplo ↓, como notan es un array
//* NOTA: Ojo!, mandarlo como array de objetos.
//* [
//*   {
//*     "size": "talla2",        (No se repite) [string]
//*   },
//*   {
//*     "size": "talla3",        (No se repite) [string]
//*   }
//* ]
//* PUT http://localhost:3001/products/details/sizes = mandar datos es por body, solo mandar lo que se va actualizar, ejemplo ↓
//* {
//*   "id": 3,                              (ID de la imagen)
//*   "size": "talla actualizado"
//* }
//* DELETE http://localhost:3001/products/details/sizes = mandar datos es por body, solo mandar el id de la imagen a eliminar, ejemplo ↓
//* NOTA: La imagen no se elimina, solo es baja logica, "isActive": false.
//* {
//*   "id": 3,                              (ID de la imagen)
//* }
router.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var size = yield (0, Sizes_1.getSize)();
        res.json(size);
    }
    catch (e) {
        next(e);
    }
}));
router.get('/all', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var size = yield (0, Sizes_1.getSizeAll)();
        res.json(size);
    }
    catch (e) {
        next(e);
    }
}));
router.post('/', userExtractor_1.userExtractorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var nSize = yield (0, Sizes_1.createSize)(req.body);
        res.json(nSize);
    }
    catch (e) {
        next(e);
    }
}));
router.put('/', userExtractor_1.userExtractorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var putSize = yield (0, Sizes_1.updateSize)(req.body);
        res.json(putSize);
    }
    catch (e) {
        next(e);
    }
}));
router.delete('/', userExtractor_1.userExtractorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var delSize = yield (0, Sizes_1.deleteSize)(req.body.id);
        res.json(delSize);
    }
    catch (e) {
        next(e);
    }
}));
exports.default = router;
