"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UFController_1 = __importDefault(require("../controller/UFController"));
const ufRotas = (0, express_1.Router)();
const ufControler = new UFController_1.default();
ufRotas.post('/', ufControler.incluirUF);
ufRotas.put('/', ufControler.alterarUF);
ufRotas.get('/', ufControler.pesquisarUF);
exports.default = ufRotas;
//# sourceMappingURL=UFRotas.js.map