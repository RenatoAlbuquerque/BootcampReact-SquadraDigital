"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SequenceError_1 = __importDefault(require("../exceptions/SequenceError"));
class AbstractDao {
    constructor(conexao) {
        this.conexao = null;
        this.conexao = conexao;
    }
    async gerarSequence(nomeSequence) {
        try {
            console.log('Tentou gerar sequence: ' + nomeSequence);
            let sql = 'SELECT ' + nomeSequence + '.NEXTVAL AS CODIGO FROM DUAL';
            let resultado = await this.conexao.execute(sql);
            let sequence = resultado.rows[0][0];
            console.log('Gerou a sequence ' + sequence);
            return sequence;
        }
        catch (error) {
            throw new SequenceError_1.default(nomeSequence, error);
        }
    }
}
exports.default = AbstractDao;
//# sourceMappingURL=AbstractDao.js.map