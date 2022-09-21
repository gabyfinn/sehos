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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
/* import { Products, Users, Category, Product_details, Color, Images, Sizes } from "../db";
import { Op } from "sequelize" */
const axios_1 = __importDefault(require("axios"));
const getProducts = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!product)
            throw new Error(`there's no any product for` + product);
        const { data } = yield axios_1.default.get('http://localhost:3001/products');
        const filtrados = data.filter((p) => p.name.toLowerCase().includes(product.toLowerCase()));
        if (!filtrados)
            throw new Error(`Theres no coincidence for ${product}`);
        return filtrados;
    }
    catch (error) {
        return [];
    }
});
exports.getProducts = getProducts;
