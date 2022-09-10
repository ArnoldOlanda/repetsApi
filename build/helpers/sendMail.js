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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMail = (mailTo, verifyCode) => __awaiter(void 0, void 0, void 0, function* () {
    const config = {
        host: `${process.env.GMAIL_SENDER_HOST}`,
        port: Number(process.env.GMAIL_SENDER_PORT),
        auth: {
            user: `${process.env.GMAIL_SENDER}`,
            pass: `${process.env.GMAIL_SENDER_PASSWORD}`
        }
    };
    const mensaje = {
        from: 'olanda188@gmail.com',
        to: mailTo,
        subject: 'Codigo de verificacion',
        text: `Este es tu codigo de verificacion para verificar tu cuenta: ${verifyCode}`
    };
    const transport = nodemailer_1.default.createTransport(config);
    const info = yield transport.sendMail(mensaje);
    console.log(info);
});
exports.sendMail = sendMail;
//# sourceMappingURL=sendMail.js.map