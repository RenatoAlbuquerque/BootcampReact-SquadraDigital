import React, { useContext } from "react";
import {
  Header,
  Footer,
  FormRegistroUF,
  FormEditarUf,
  ListaUF,
} from "../../Components";
import { UfContext } from "../../Contexts/ufContext";


const PageUf = () => {
  const { ufAtual } = useContext(UfContext)

  return (
    <>
      <Header />
      {ufAtual ? (
        <FormEditarUf />
      ): (
        <FormRegistroUF />
      )}
      <ListaUF />
      <Footer />
    </>
  );
};

export default PageUf;
