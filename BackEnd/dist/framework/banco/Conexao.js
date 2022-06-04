"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oracledb_1 = __importDefault(require("oracledb"));
const ConexaoError_1 = __importDefault(require("../exceptions/ConexaoError"));
class Conexao {
    constructor() {
    }
    static async abrirConexao() {
        try {
            if (this.conexao === null || this.conexao.isClosed()) {
                console.log('Tentando abrir conexao');
                this.conexao = await oracledb_1.default.getConnection({ user: 'C##REACT', password: 'react', connectString: 'localhost:1521/XE' });
                console.log('Abriu conexao');
            }
            return this.conexao;
        }
        catch (error) {
            throw new ConexaoError_1.default("Não foi possível abrir conexão com o banco de dados", 404, error);
        }
    }
    static async fecharConexao() {
        if (this.conexao != null) {
            console.log('Tentando fechar conexao');
            this.conexao.close();
            this.conexao = null;
            console.log('Conexao fechada');
        }
    }
    static async commit() {
        if (this.conexao != null) {
            console.log('Tentando comitar a transação');
            this.conexao.commit();
            console.log('Comitou a transacao');
        }
    }
    static async rollback() {
        if (this.conexao != null) {
            console.log('Tentando desfazer a transação');
            this.conexao.rollback();
            console.log('Executou rollback');
        }
    }
}
Conexao.conexao = null;
exports.default = Conexao;
//# sourceMappingURL=Conexao.js.map