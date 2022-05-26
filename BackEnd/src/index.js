const express = require("express");
const { use } = require("express/lib/application");
const oracle = require("oracledb");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
var listaUFs = criarUFs();

var conexao = null;

function interceptador(request, response, proximo) {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:3333");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  response.setHeader("Access-Control-Allow-Credentials", true);
  const { method, url } = request;
  console.log(`[${method.toUpperCase()}] ${url} `);
  return proximo();
}
app.use(interceptador);

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

app.get("/uf", async function (request, response) {
  resultado = await consultarUF(request, response);
  if (response.headersSent) {
    return resultado;
  } else {
    return response.status(200).json(resultado);
  }
});

async function consultarUF(request, response) {
  const objetoConsulta = request.query;
  const { codigoUF } = request.query;
  let { sigla } = request.query;
  console.log(objetoConsulta);
  if (codigoUF != undefined) {
    //o sistema precisa retornar a UF se encontrar
    //O sistema precisa retorar uma variavel status com o código de erro 404 pra saber que não achou e retornar mensagem
    //A mensagem deve ser: Nao existe nenhuma UF com este codigo.

    //    return response.status(404).json({status: 404,mensagem: 'Nao existe nenhuma UF com este codigo.'})

    try {
      await abrirConexao();
      console.log("INICIANDO CONSULTA PELO CODIGO");
      let sql =
        "SELECT CODIGO_UF, SIGLA, NOME, STATUS FROM TB_UF WHERE CODIGO_UF = :codigoUF";
      let resultado = await conexao.execute(sql, [codigoUF]);
      let quantidadeResultados = resultado.rows.length;
      let ufAtual = null;
      if (quantidadeResultados == 1) {
        ufAtual = {
          codigoUF: resultado.rows[0][0],
          sigla: resultado.rows[0][1],
          nome: resultado.rows[0][2],
          status: resultado.rows[0][3],
        };
      } else {
        await fecharConexao();
        return response.status(404).json({
          status: 404,
          mensagem: "Nao existe nenhuma UF com este codigo.",
        });
      }
      await fecharConexao();
      console.log(resultado);
      console.log(resultado.rows);
      console.log("FINAL DA CONSULTA PELO CODIGO");
      return response.json(ufAtual);
    } catch (err) {
      console.err(err);
      return response.status(404).json({
        status: 404,
        mensagem: "Nao foi possivel fazer conexao com o banco.",
      });
    }
  } else if (sigla != undefined) {
    console.log(sigla);
    sigla = sigla.toUpperCase(); //GAMBIARRA, VAMOS MUDAR DEPOIS
    console.log(sigla);
    if (sigla == "") {
      return response
        .status(404)
        .json({ status: 404, mensagem: "A sigla nao pode ser vazia." });
    }
    try {
      await abrirConexao();
      console.log("INICIANDO CONSULTA PELA SIGLA");
      let sql =
        "SELECT CODIGO_UF, SIGLA, NOME, STATUS FROM TB_UF WHERE SIGLA = :sigla";
      let resultado = await conexao.execute(sql, [sigla]);
      let quantidadeResultados = resultado.rows.length;
      let ufAtual = null;
      if (quantidadeResultados == 1) {
        ufAtual = {
          codigoUF: resultado.rows[0][0],
          sigla: resultado.rows[0][1],
          nome: resultado.rows[0][2],
          status: resultado.rows[0][3],
        };
      } else {
        await fecharConexao();
        return response.status(404).json({
          status: 404,
          mensagem: "Nao existe nenhuma UF com esta sigla.",
        });
      }
      await fecharConexao();
      console.log(resultado);
      console.log(resultado.rows);
      console.log("FINAL DA CONSULTA PELA SIGLA");
      return response.json(ufAtual);
    } catch (err) {
      console.err(err);
      return response.status(404).json({
        status: 404,
        mensagem: "Nao foi possivel fazer conexao com o banco.",
      });
    }
  } else {
    try {
      listaUFs = [];
      await abrirConexao();
      console.log("INICIANDO CONSULTA");
      let sql = "SELECT CODIGO_UF, SIGLA, NOME, STATUS FROM TB_UF";
      let resultado = await conexao.execute(sql);
      //listaUFs = resultado;
      let numeroCampo = 0;
      let numeroLinha = 0;
      let quantidadeResultados = resultado.rows.length;
      while (numeroLinha < quantidadeResultados) {
        let ufAtual = {
          codigoUF: resultado.rows[numeroLinha][numeroCampo++],
          sigla: resultado.rows[numeroLinha][numeroCampo++],
          nome: resultado.rows[numeroLinha][numeroCampo++],
          status: resultado.rows[numeroLinha][numeroCampo++],
        };
        listaUFs.push(ufAtual);
        numeroLinha++;
        numeroCampo = 0;
      }
      await fecharConexao();
      console.log(resultado);
      console.log(resultado.rows);
      console.log("FINAL DA CONSULTA SEM FILTROS");
      return listaUFs;
    } catch (err) {
      console.err(err);
      return response.status(404).json({
        status: 404,
        mensagem: "Nao foi possivel fazer conexao com o banco.",
      });
    }
  }
}

async function gerarSequence(nomeSequence) {
  await abrirConexao();
  console.log("Tentou gerar sequence");
  let sql = "SELECT " + nomeSequence + ".NEXTVAL AS CODIGO FROM DUAL";
  let resultado = await conexao.execute(sql);
  let sequence = resultado.rows[0][0];
  await fecharConexao();
  console.log("Gerou a sequence " + sequence);
  return sequence;
}

app.post("/uf", async (request, response) => {
  try {
    // quando gravar a uf, traga também, a lista atualizada dos registros que estão no banco.
    const uf = request.body; //BUSCANDO JSON DO CORPO DA REQUISIÇÃO
    uf.codigoUF = await gerarSequence("SEQUENCE_UF");
    console.log(uf);
    let sql =
      "INSERT INTO TB_UF (CODIGO_UF, SIGLA, NOME, STATUS) VALUES (:codigoUF, :sigla, :nome, :status)";
    await abrirConexao();
    let resultado = await conexao.execute(sql, uf);
    console.log(resultado);
    console.log(
      "Foram inseridos " +
        resultado.rowsAffected +
        " registros no banco de dados."
    );
    await commit();
    listaUFs = await consultarUF(request, response);
    return response.status(201).json(listaUFs);
  } catch (error) {
    await rollback();
    console.err(error);
    return response.status(404).json({
      status: 404,
      mensagem: "Nao foi possivel fazer conexao com o banco.",
    });
  } finally {
    await fecharConexao();
  }
});

app.delete("/ufs/:codigoUF", async function (request, response) {
  try {
    const { codigoUF } = request.params; //PARAMETRO DE ROTA
    console.log(codigoUF);
    await abrirConexao();
    const sql = "DELETE FROM TB_UF WHERE CODIGO_UF = :codigoUF";
    let resultado = await conexao.execute(sql, [codigoUF]);
    console.log(resultado);
    console.log(resultado.rowsAffected);
    if (resultado.rowsAffected == 0) {
      await rollback();
      return response.status(404).json({
        status: 404,
        mensagem: "Nao existe nenhuma UF com este codigo.",
      });
    } else {
      await commit();
      listaUFs = await consultarUF(request, response);
      return response.json(listaUFs);
    }
  } catch (err) {
    console.err(err);
    await rollback();
    return response.status(404).json({
      status: 404,
      mensagem: "Nao foi possivel fazer conexao com o banco.",
    });
  } finally {
    await fecharConexao(); //EXECUTA SEMPRE, COM ERRO OU SEM ERRO. EXECUTADO DEPOIS DO CATCH OU DO TRY
  }
});

app.put("/uf", async (request, response) => {
  // quando alterar a uf, traga também, a lista atualizada dos registros que estão no banco.
  const ufAtual = request.body; //BUSCANDO JSON DO CORPO DA REQUISIÇÃO
  console.log(ufAtual);
  try {
    await abrirConexao();
    const sql =
      "UPDATE TB_UF SET SIGLA = :sigla, NOME = :nome, STATUS = :status  WHERE CODIGO_UF = :codigoUF";
    let resultado = await conexao.execute(sql, ufAtual);
    console.log(resultado);
    console.log(resultado.rowsAffected);
    if (resultado.rowsAffected == 0) {
      await rollback();
      return response.status(404).json({
        status: 404,
        mensagem: "Nao existe nenhuma UF com este codigo.",
      });
    } else {
      await commit();
      listaUFs = await consultarUF(request, response);
      return response.json(listaUFs);
    }
  } catch (err) {
    console.error(err);
    await rollback();
    return response.status(404).json({
      status: 404,
      mensagem: "Nao foi possivel fazer conexao com o banco.",
    });
  } finally {
    await fecharConexao(); //EXECUTA SEMPRE, COM ERRO OU SEM ERRO. EXECUTADO DEPOIS DO CATCH OU DO TRY
  }
});

app.patch("/uf", async function (request, response) {
  try {
    let uf = request.body;
    await abrirConexao();
    let sql =
      "UPDATE TB_UF SET SIGLA = :sigla, NOME = :nome, STATUS = :status WHERE CODIGO_UF = :codigoUF";
    let resultado = await conexao.execute(sql, uf);
    commit();
    let listaDasUFs = await consultarUF(request, response);
    response.json(listaDasUFs);
  } catch (err) {
    await rollback();
  } finally {
    await fecharConexao();
  }
});

app.delete("/uf/:codigoUF", async function (request, response) {
  try {
    const { codigoUF } = request.params; //PARAMETRO DE ROTA
    await abrirConexao();
    const sql = "DELETE FROM TB_UF WHERE CODIGO_UF = :codigoUF";
    let resultado = await conexao.execute(sql, [codigoUF]);
    commit();
    let listaDasUFs = await consultarUF(request, response);
    response.json(listaDasUFs);
  } catch (err) {
    await rollback();
  } finally {
    await fecharConexao();
  }
});

function criarUFs() {
  listaUFs = [];
  return listaUFs;
}

app.listen(3333);
