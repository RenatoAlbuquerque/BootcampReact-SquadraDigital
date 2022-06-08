import React, { useContext } from "react";
import {
  Header,
  Footer,
  EnderecosCadastrados,
  FormRegistroPessoaEndereco,
  FormEditarPessoaEndereco
} from "../../Components";
import { pessoaContext } from "../../Contexts/pessoasContext";


const PagPessoa = () => {
  const {pessoaEditar} = useContext(pessoaContext)

  return (
    <>
      <Header />
      {!pessoaEditar ? (
        <FormRegistroPessoaEndereco/>
      ):(
        <FormEditarPessoaEndereco/>
      )}
      <EnderecosCadastrados/>
      <Footer />
    </>
  );
};
export default PagPessoa;
