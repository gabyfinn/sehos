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
// http://localhost:3001/products/search/:product
// se puede buscar lo que sea y el search encontrara los resultados mas 
// acertados con que solo incluya una cierta parte de la palabra o nombre completo del producto
// ej: buscar "san" ya devolveria todos los productos, que 
//empiecen, contengan o terminen con la palabra "san", como sandalias, sandalia1, sandalia2 etc.
const express_1 = require("express");
const SearchBar_1 = require("../controllers/SearchBar");
const search = (0, express_1.Router)();
search.get('/:product', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var orders = yield (0, SearchBar_1.getProducts)(req.params.product);
        res.json(orders);
    }
    catch (e) {
        res.json({ error: e.message });
    }
}));
exports.default = search;
