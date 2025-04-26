"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHTML = void 0;
const fs_1 = require("fs");
const handlebars_1 = __importDefault(require("handlebars"));
const getHTML = () => {
    console.log(__dirname);
    const html = (0, fs_1.readFileSync)("public/html/registration-mail.html");
    const com = handlebars_1.default.compile(html.toString());
    return com({});
};
exports.getHTML = getHTML;
