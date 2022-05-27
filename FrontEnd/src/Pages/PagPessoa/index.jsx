import React from "react";
import {
  Header,
  Footer,
  EnderecosCadastrados,
  FormRegistroPessoaEndereco
} from "../../Components";


const PagPessoa = () => {
  return (
    <>
      <Header />
      <FormRegistroPessoaEndereco/>
      <EnderecosCadastrados/>
      <Footer />
    </>
  );
};
export default PagPessoa;
