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
const Color_1 = require("../controllers/Color");
const userExtractor_1 = require("../middleware/userExtractor");
const router = (0, express_1.Router)();
//* README *
//* LAS OPCIONES DE AGREGAR, ACTUALIZA, ELIMINAR, SOLO ESTAN DISPONIBLES PARA EL USUARIO DE NIVEL ADMINISTRADOR
//* GET http://localhost:3001/products/details/color = Lista de todos los colores para los productos (isActive=true)
//* NOTA: Es un Array de objetos. ejemplo ↓
//* [
//*   {
//*     "id": 1,
//*     "color": "Negro",
//*     "isActive": true
//*   },
//*   {
//*     "id": 2,
//*     "color": "Blanco",
//*     "isActive": true
//*   }
//* ]
//* GET http://localhost:3001/products/details/color/all = Lista de todas las imagenes para el carrousel [Slider] (isActive=true y isActive=false)
//* POST http://localhost:3001/carrousel = Envio por BODY[req.body], ejemplo ↓
//* NOTA: agregar imagenes sera por formulario cuando queramos agregar imagenes del producto.
//* NOTA: Ojo!, mandarlo como objeto.
//* {
//*   "color": "color1",        (No se repite) [string]
//* }
//* NOTA: Si queremos agregar varias imagenes al azar, ejemplo ↓, como notan es un array
//* NOTA: Ojo!, mandarlo como array de objetos.
//* [
//*   {
//*     "color": "color2",        (No se repite) [string]
//*   },
//*   {
//*     "color": "color3",        (No se repite) [string]
//*   }
//* ]
//* PUT http://localhost:3001/products/details/color = mandar datos es por body, solo mandar lo que se va actualizar, ejemplo ↓
//* {
//*   "id": 3,                              (ID de la imagen)
//*   "color": "color actualizado"
//* }
//* DELETE http://localhost:3001/products/details/color = mandar datos es por body, solo mandar el id de la imagen a eliminar, ejemplo ↓
//* NOTA: La imagen no se elimina, solo es baja logica, "isActive": false.
//* {
//*   "id": 3,                              (ID de la imagen)
//* }
router.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var color = yield (0, Color_1.getColor)();
        res.json(color);
    }
    catch (e) {
        next(e);
    }
}));
router.get('/all', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var color = yield (0, Color_1.getColorAll)();
        res.json(color);
    }
    catch (e) {
        next(e);
    }
}));
router.post('/', userExtractor_1.userExtractorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var nColor = yield (0, Color_1.createColor)(req.body);
        res.json(nColor);
    }
    catch (e) {
        next(e);
    }
}));
router.put('/', userExtractor_1.userExtractorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var putColor = yield (0, Color_1.updateColor)(req.body);
        res.json(putColor);
    }
    catch (e) {
        next(e);
    }
}));
router.delete('/', userExtractor_1.userExtractorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var delColor = yield (0, Color_1.deleteColor)(req.body.id);
        res.json(delColor);
    }
    catch (e) {
        next(e);
    }
}));
exports.default = router;
