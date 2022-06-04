"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PessoaController_1 = __importDefault(require("../controller/PessoaController"));
const pessoaRotas = (0, express_1.Router)();
const pessoaController = new PessoaController_1.default();
pessoaRotas.post('/', pessoaController.incluirPessoa);
pessoaRotas.put('/', pessoaController.alterarPessoa);
pessoaRotas.get('/', pessoaController.pesquisarPessoa);
exports.default = pessoaRotas;
//# sourceMappingURL=PessoaRotas.js.map