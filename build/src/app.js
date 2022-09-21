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
const express_1 = __importDefault(require("express"));
//import {/*  Router, */ Request, Response, NextFunction } from 'express';
const index_1 = __importDefault(require("./routes/index"));
const body_parser_1 = __importDefault(require("body-parser"));
const handleErrors_1 = require("./middleware/handleErrors");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config();
/* import Stripe from 'stripe'; */
const STRIPE_TOKEN = process.env.STRIPE_TOKEN;
const stripe = require('stripe')(STRIPE_TOKEN);
/* stripe(STRIPE_TOKEN) */
require('./db');
const server = (0, express_1.default)();
// let allowCors = function (_req: Request, res: Response, next: NextFunction) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', "true");
//   // Pass to next layer of middleware
//   next();
// }
// server.name = 'API';
server.use(body_parser_1.default.urlencoded({ extended: true, limit: '50mb' }));
server.use(body_parser_1.default.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
//server.use(allowCors)
server.use(cors({ credentials: true, origin: '*', methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'] }));
// server.use((_req: Request, res: Response, next: NextFunction) => {
//   res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });
server.use(express_1.default.json());
/* server.options */
server.post('/api/checkout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, amount } = req.body;
        /* const monto=200; */
        const paymentIntent = yield stripe.paymentIntents.create({
            currency: 'USD',
            description: 'console',
            payment_method: id,
            confirm: true,
            amount,
        });
        console.log(req.body);
        console.log(paymentIntent);
        res.send(paymentIntent);
    }
    catch (error) {
        console.log(error);
        console.log(error.raw.message);
        res.status(404).json({ msg: error.raw.message });
    }
}));
server.use('/', index_1.default);
//CONTROLADOR DE ERRORES, USAR NEXT EN EL CATCH PARA USAR ESTO
server.use(handleErrors_1.errorHandler);
exports.default = server;
