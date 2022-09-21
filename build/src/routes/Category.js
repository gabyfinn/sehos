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
//require
const Categories_1 = require("../controllers/Categories");
const express_1 = require("express");
const userExtractor_1 = require("../middleware/userExtractor");
// const { getCategories } = Categories
//Breve Documentacion:
// Ruta GET/category --> trae todas las categorías
// Ruta POST/category --> se envia por body la nueva categoría como un "string".
// Ruta PATCH/category --> se envia por body un objeto cuya primera key 
// debe llamarse ser el 'id' 
// y la segunda key debe llamarse 'update' y el value tiene que ser el valor actualizado.
// ej: 
// {
//     id:"1",
//     update:"zapatos"
// }
const Category = (0, express_1.Router)();
Category.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categories = yield (0, Categories_1.getCategories)();
        if (categories) {
            res.json(categories);
        }
    }
    catch (e) {
        next(e);
    }
}));
Category.post('/', userExtractor_1.userExtractorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdCategory = yield (0, Categories_1.postCategory)(req.body);
        if (createdCategory) {
            res.json(createdCategory);
        }
    }
    catch (e) {
        next(e);
    }
}));
Category.patch('/', userExtractor_1.userExtractorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patchedCategory = yield (0, Categories_1.patchCategory)(req.body);
        if (patchedCategory) {
            res.json(patchedCategory);
        }
    }
    catch (e) {
        next(e);
    }
}));
Category.delete('/', userExtractor_1.userExtractorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patchedCategory = yield (0, Categories_1.deleteCategory)(req.body);
        if (patchedCategory) {
            res.json(patchedCategory);
        }
    }
    catch (e) {
        next(e);
    }
}));
exports.default = Category;
