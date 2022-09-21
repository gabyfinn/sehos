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
exports.getCartAmount = exports.getCartArr = void 0;
const db_1 = require("../db");
const getCartArr = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = yield db_1.Users.findOne({
        where: { email: email },
        include: ['cart']
    });
    if (userID) {
        const cartObjects = yield userID.getDataValue('cart');
        if (cartObjects.length) {
            const arrayDeProds = cartObjects.map((prod_D) => __awaiter(void 0, void 0, void 0, function* () {
                const product_del_productD = yield db_1.Products.findOne({ where: { id: prod_D.id_product } });
                if (product_del_productD) {
                    const product_pd = {
                        id_product_details: prod_D.id,
                        price: product_del_productD.sell_price,
                        quantity: prod_D.quantity
                    };
                    return product_pd;
                }
                else {
                    return {};
                }
            }));
            if (arrayDeProds.length) {
                return arrayDeProds;
            }
            else {
                throw new Error('Revisar arrayDeProds');
            }
        }
    }
});
exports.getCartArr = getCartArr;
const getCartAmount = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const cartArray = yield (0, exports.getCartArr)(email);
    let ammount = 0;
    cartArray.forEach(product => ammount += product.price * product.quantity);
    if (ammount > 0) {
        return ammount;
    }
});
exports.getCartAmount = getCartAmount;
// let monto:number = 0
//                 arrayDeProds.forEach(p=>monto+= p.price*p.quantity)
