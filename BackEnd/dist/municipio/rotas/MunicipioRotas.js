"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MunicipioController_1 = __importDefault(require("../controller/MunicipioController"));
const municipioRotas = (0, express_1.Router)();
const municipioControler = new MunicipioController_1.default();
municipioRotas.post('/', municipioControler.incluirMunicipio);
municipioRotas.put('/', municipioControler.alterarMunicipio);
municipioRotas.get('/', municipioControler.pesquisarMunicipio);
exports.default = municipioRotas;
//# sourceMappingURL=MunicipioRotas.js.map