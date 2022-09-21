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
const express_1 = require("express");
const Amount_1 = require("../controllers/Amount");
const Ammount = (0, express_1.Router)();
Ammount.get('/cart/ammount/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ammount = (0, Amount_1.getCartAmount)(req.params.email);
        if (ammount) {
            res.status(200).send(ammount);
        }
    }
    catch (error) {
        console.log(error);
    }
}));
