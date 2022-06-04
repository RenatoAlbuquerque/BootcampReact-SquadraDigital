"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractError_1 = __importDefault(require("./AbstractError"));
class SequenceError extends AbstractError_1.default {
    constructor(nomeSequence, causa) {
        super("Não foi possível gerar a sequence: " + nomeSequence + ".", 404, causa);
    }
}
exports.default = SequenceError;
//# sourceMappingURL=SequenceError.js.map