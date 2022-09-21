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
const db_1 = require("../../db");
const EmailSender_1 = require("./EmailSender");
function SendRecoveryInstructions(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!email)
                throw new Error('Email is required for this operation.');
            const UserByEmail = yield db_1.Users.findOne({
                where: {
                    email: email.toString().toLowerCase(),
                },
            });
            if (!UserByEmail)
                (0, EmailSender_1.sendEmailIvitation)(email, 'Bienvenido a SEHOS store!');
            else if (UserByEmail.type_user === 'Google')
                (0, EmailSender_1.sendGoogleEmailUser)(email, 'Registrado con Google Account');
            else
                (0, EmailSender_1.sendEmailInstructions)(email, 'Recuperar contraseña', UserByEmail.id, UserByEmail.username);
            return 'Instructions sent successfully.';
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
exports.default = SendRecoveryInstructions;
