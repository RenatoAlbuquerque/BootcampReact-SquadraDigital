"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UFRotas_1 = __importDefault(require("../uf/rotas/UFRotas"));
const MunicipioRotas_1 = __importDefault(require("../municipio/rotas/MunicipioRotas"));
const BairroRotas_1 = __importDefault(require("../bairro/rotas/BairroRotas"));
const PessoaRotas_1 = __importDefault(require("../pessoa/rotas/PessoaRotas"));
const rotas = (0, express_1.Router)();
rotas.use('/uf', UFRotas_1.default);
rotas.use('/municipio', MunicipioRotas_1.default);
rotas.use('/bairro', BairroRotas_1.default);
rotas.use('/pessoa', PessoaRotas_1.default);
exports.default = rotas;
//# sourceMappingURL=index.js.map