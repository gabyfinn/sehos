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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// se requiere el models
const express_1 = require("express");
const Products_1 = require("../controllers/Products");
const userExtractor_1 = require("../middleware/userExtractor");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const router = (0, express_1.Router)();
router.get('/', (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var products = yield (0, Products_1.getProducts)();
        res.json(products);
    }
    catch (e) {
        next(e);
    }
}));
router.get('/id/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        console.log(id);
        const product = yield (0, Products_1.getProductById)(Number(id));
        res.json(product);
    }
    catch (error) {
        next(error);
    }
}));
router.get('/dashboard', /* userExtractorAdmin, */ (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { time, category } = req.body;
        var products = yield (0, Products_1.getProductsAdmin)(time, category);
        res.json(products);
    }
    catch (e) {
        next(e);
    }
}));
router.post('/', /* userExtractorAdmin, */ (0, express_fileupload_1.default)({ useTempFiles: true, tempFileDir: './src/uploads' }), (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.files);
        var nProducts = yield (0, Products_1.createProducts)(req);
        res.json(nProducts);
    }
    catch (e) {
        // next(e)
        res.send(e.message);
    }
}));
router.put('/', userExtractor_1.userExtractorAdmin, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var putProducts = yield (0, Products_1.updateProducts)(req.body);
        res.json(putProducts);
    }
    catch (e) {
        console.log(e);
        next(e);
    }
}));
router.delete('/', /* userExtractorAdmin, */ (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.id);
        var delProducts = yield (0, Products_1.deleteProducts)(req.body.id);
        res.json(delProducts);
    }
    catch (e) {
        next(e);
    }
}));
exports.default = router;
