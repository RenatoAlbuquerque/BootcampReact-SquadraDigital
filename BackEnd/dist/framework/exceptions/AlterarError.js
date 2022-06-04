"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractError_1 = __importDefault(require("./AbstractError"));
class AlterarError extends AbstractError_1.default {
    constructor(modulo, motivo, status, causa) {
        super("Não foi possível alterar " + modulo + " no banco de dados.<br>Motivo: " + motivo, status, causa);
    }
}
exports.default = AlterarError;
//# sourceMappingURL=AlterarError.js.map