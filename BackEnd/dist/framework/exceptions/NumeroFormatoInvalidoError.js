"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractError_1 = __importDefault(require("./AbstractError"));
class NumeroFormatoInvalidoError extends AbstractError_1.default {
    constructor(acao, modulo, nomeCampo, valorCampo, status) {
        super("Não foi possível " + acao + " " + modulo + " no banco de dados.<br>Motivo: O valor do campo " + nomeCampo + " precisa ser um número, e você passou '" + valorCampo + "'.", status, null);
    }
}
exports.default = NumeroFormatoInvalidoError;
//# sourceMappingURL=NumeroFormatoInvalidoError.js.map