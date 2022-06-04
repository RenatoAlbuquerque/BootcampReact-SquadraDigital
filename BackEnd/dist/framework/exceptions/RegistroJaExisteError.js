"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractError_1 = __importDefault(require("./AbstractError"));
class RegistroJaExisteError extends AbstractError_1.default {
    constructor(acao, modulo, textoDoCampoRepetido, status) {
        super("Não foi possível " + acao + " " + modulo + " no banco de dados.<br>Motivo: Já existe um(a) registro de " + modulo + " com " + textoDoCampoRepetido + " cadastrado no banco de dados.", status, null);
    }
}
exports.default = RegistroJaExisteError;
//# sourceMappingURL=RegistroJaExisteError.js.map