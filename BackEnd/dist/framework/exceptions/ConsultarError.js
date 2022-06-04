"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractError_1 = __importDefault(require("./AbstractError"));
class ConsultarError extends AbstractError_1.default {
    constructor(modulo, motivo, status, causa) {
        super("Não foi possível consultar " + modulo + " no banco de dados.<br>Motivo: " + motivo, status, causa);
    }
}
exports.default = ConsultarError;
//# sourceMappingURL=ConsultarError.js.map