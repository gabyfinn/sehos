"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = void 0;
const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.API_MAIL_KEY;
const transporter = new Sib.TransactionalEmailsApi();
const sender = {
    name: 'SEHOS PF',
    email: 'sohes2022@hotmail.com',
};
const send = (email, subject, content) => {
    const receiver = [{ email }];
    transporter.sendTransacEmail({
        sender,
        to: receiver,
        subject,
        htmlContent: `<!DOCTYPE html><html><body><h1>${subject}</h1><p>${content}</p></body></html>`,
        //textContent: content,
    });
};
exports.send = send;
