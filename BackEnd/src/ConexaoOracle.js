const oracle = require("oracledb");

var conexao = null;

async function abrirConexao() {
  if (conexao == null) {
    console.log("Tentando abrir conexao");
    conexao = await oracle.getConnection({
      user: "C##REACT",
      password: "react",
      connectString: "localhost:1521/XE",
    });
    console.log("Abriu conexao");
  }
}

async function fecharConexao() {
  if (conexao != null) {
    console.log("Tentando fechar conexao");
    conexao.close();
    conexao = null;
    console.log("Conexao fechada");
  }
}

async function commit() {
  if (conexao != null) {
    console.log("Tentando comitar a transação");
    conexao.commit();
    console.log("Comitou a transacao");
  }
}

async function rollback() {
  if (conexao != null) {
    console.log("Tentando desfazer a transação");
    conexao.rollback();
    console.log("Executou rollback");
  }
}
