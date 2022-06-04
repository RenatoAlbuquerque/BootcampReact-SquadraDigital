"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractError_1 = __importDefault(require("./AbstractError"));
class CampoObrigatorioError extends AbstractError_1.default {
    constructor(acao, nomeDoCampo) {
        super("Não foi possível " + acao + " no banco de dados.<br>Motivo: o campo " + nomeDoCampo + " é obrigatório.", 404, null);
        this.nomeDoCampo = "";
        this.nomeDoCampo = nomeDoCampo;
    }
}
exports.default = CampoObrigatorioError;
//# sourceMappingURL=CampoObrigatorioError.js.map