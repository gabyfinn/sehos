"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const orders_details = __importStar(require("../controllers/Orders_details"));
const router = express_1.default.Router();
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const details = yield orders_details.getOrders_details();
        if (details)
            res.send(details);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrders_details = orders_details.toNewOrder_Detail(req.body);
        const result = yield orders_details.createOrder_detail(newOrders_details);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* const updateOrders_details: any = orders_details.toUpdateOrder_Detail(req.body) */
        const updateOrders_details = yield orders_details.updateOrder_Detail(req.body);
        res.json(updateOrders_details);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}));
router.get("/:orderId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detail = yield orders_details.getOrderDetail(req.params.orderId);
        if (detail)
            return res.send(detail);
    }
    catch (error) {
        return res.json(error);
    }
    return;
}));
// El order_Detail nunca se eliminar de la base de datos.
/* router.delete('/:id', async (req, res) => {
  try{
    const deleteOrders_details: any = await orders_details.deleteOrder_Detail(req.params)
    res.json(deleteOrders_details)
  }catch (error: any){
    res.status(400).json({ error: error.message})
  }
}) */
exports.default = router;
