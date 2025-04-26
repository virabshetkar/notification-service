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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const services_1 = require("./services");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post("/api/notifications/send-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.MAIL_HOST,
        port: parseInt((_a = process.env.MAIL_PORT) !== null && _a !== void 0 ? _a : "1025"),
        secure: process.env.MAIL_SECURE == "true",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        tls: {
            host: process.env.HOST,
            ciphers: "SSLv3",
        },
    });
    const info = yield transporter.sendMail({
        from: "Gym Notifier <notifier@gymapp.com>",
        to: "virabshetkar@gmail.com",
        subject: "Welcome to Gym",
        html: (0, services_1.getHTML)(),
    });
    res.json({ message: "Email Sent", id: info.messageId });
}));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
});
