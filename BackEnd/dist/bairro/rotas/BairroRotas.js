"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BairroController_1 = __importDefault(require("../controller/BairroController"));
const bairroRotas = (0, express_1.Router)();
const bairroControler = new BairroController_1.default();
bairroRotas.post('/', bairroControler.incluirBairro);
bairroRotas.put('/', bairroControler.alterarBairro);
bairroRotas.get('/', bairroControler.pesquisarBairro);
exports.default = bairroRotas;
//# sourceMappingURL=BairroRotas.js.map