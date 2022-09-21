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
const express_1 = require("express");
const Category_1 = __importDefault(require("./Category"));
const Users_1 = __importDefault(require("./Users"));
const Sizes_1 = __importDefault(require("./Sizes"));
const Carrousel_1 = __importDefault(require("./Carrousel"));
const Products_1 = __importDefault(require("./Products"));
const Orders_1 = __importDefault(require("./Orders"));
const Address_1 = __importDefault(require("./Address"));
const Images_1 = __importDefault(require("./Images"));
const Color_1 = __importDefault(require("./Color"));
const Product_details_1 = __importDefault(require("./Product_details"));
const Orders_details_1 = __importDefault(require("./Orders_details"));
const SearchBar_1 = __importDefault(require("./SearchBar"));
const Login_1 = __importDefault(require("./Login"));
const NotificationMail_1 = require("./../controllers/NotificationMail");
const RecoveryPassword_1 = __importDefault(require("./RecoveryPassword"));
const Reviews_1 = __importDefault(require("./Reviews"));
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.json({ messagee: '✅ API_ON! ✅' });
});
router.post('/email', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, subject, content } = req.body;
        yield (0, NotificationMail_1.send)(email, subject, content);
        res.send('mensaje enviado');
    }
    catch (error) {
        next(error);
    }
}));
router.use('/products/search', SearchBar_1.default);
router.use('/login', Login_1.default);
router.use('/users', Users_1.default); // jesner -> aqui mismo esta el Cart_Detail y Favoritos
router.use('/users/address', Address_1.default); // facundo
router.use('/carrousel', Carrousel_1.default); // jesner
router.use('/category', Category_1.default); // facundo
router.use('/products', Products_1.default); // jesner
router.use('/products/details', Product_details_1.default); // jesner
router.use('/products/details/sizes', Sizes_1.default); // jesner
router.use('/products/details/images', Images_1.default); // jesner
router.use('/products/details/color', Color_1.default); // jesner
router.use('/orders', Orders_1.default); // jesner
router.use('/orders/details', Orders_details_1.default);
router.use('/reviews', Reviews_1.default); //andres
router.use('/recovery_password', RecoveryPassword_1.default); //joel
exports.default = router;
