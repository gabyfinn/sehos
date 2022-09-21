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
const Orders_1 = require("../controllers/Orders");
const userExtractor_1 = require("../middleware/userExtractor");
const router = (0, express_1.Router)();
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var orders = yield (0, Orders_1.getOrders)();
        res.json(orders);
    }
    catch (e) {
        res.json({ error: e.message });
    }
}));
router.post("/", userExtractor_1.userExtractorUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var nOrders = yield (0, Orders_1.createOrders)(Object.assign(Object.assign({}, req.params), req.body));
        res.json(nOrders);
    }
    catch (e) {
        res.status(404).json({ error: e.message });
    }
}));
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var putOrders = yield (0, Orders_1.updateOrders)(req.body);
        res.json(putOrders);
    }
    catch (e) {
        res.json({ error: e.message });
    }
}));
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var delOrders = yield (0, Orders_1.deleteOrders)(req.body.id);
        res.json(delOrders);
    }
    catch (e) {
        res.json({ error: e.message });
    }
}));
router.get("/user", userExtractor_1.userExtractorUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body)
        var orders = yield (0, Orders_1.getOrdersUser)(req.params.id);
        return res.json(orders);
    }
    catch (error) {
        return res.json({ error });
    }
}));
exports.default = router;
