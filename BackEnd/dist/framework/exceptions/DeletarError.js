"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractError_1 = __importDefault(require("./AbstractError"));
class DeletarError extends AbstractError_1.default {
    constructor(modulo, motivo, status, causa) {
        super("Não foi possível deletar " + modulo + " no banco de dados.<br>Motivo: " + motivo, status, causa);
    }
}
exports.default = DeletarError;
//# sourceMappingURL=DeletarError.js.map