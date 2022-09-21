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
exports.login = void 0;
const db_1 = require("../db");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const login = (value) => __awaiter(void 0, void 0, void 0, function* () {
    if (value.email && value.password) {
        var user = yield db_1.Users.findOne({ where: { email: value.email } });
        if (!user.isActive)
            throw new Error("Deleted account");
        console.log(user.isActive);
        user = JSON.parse(JSON.stringify(user, null, 2));
        const passwordCorrect = user === null ? false : yield bcrypt.compareSync(value.password, user.password);
        if (!passwordCorrect) {
            return { message: 'Incorrect user or password' };
        }
        user = Object.assign(Object.assign({}, user), { token: jwt.sign(user, process.env.JWT_SECRET_TOKEN, { expiresIn: 60 * 60 * 24 }) }); // token valido x 24 horas
        return user;
    }
    else {
        return { message: 'You must to insert user and password' };
    }
});
exports.login = login;
