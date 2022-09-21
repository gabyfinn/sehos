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
const Product_details_1 = require("../controllers/Product_details");
const userExtractor_1 = require("../middleware/userExtractor");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var p_Details = yield (0, Product_details_1.getP_Details)();
        res.json(p_Details);
    }
    catch (e) {
        res.json({ error: e.message });
    }
}));
router.post('/', userExtractor_1.userExtractorAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var nP_Details = yield (0, Product_details_1.createP_Details)(req.body);
        res.json(nP_Details);
    }
    catch (e) {
        res.json({ error: e.message });
    }
}));
router.put('/', userExtractor_1.userExtractorAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var putP_Details = yield (0, Product_details_1.updateP_Details)(req.body);
        res.json(putP_Details);
    }
    catch (e) {
        res.json({ error: e.message });
    }
}));
router.delete('/', userExtractor_1.userExtractorAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var delP_Details = yield (0, Product_details_1.deleteP_Details)(req.body.id);
        res.json(delP_Details);
    }
    catch (e) {
        res.json({ error: e.message });
    }
}));
exports.default = router;
