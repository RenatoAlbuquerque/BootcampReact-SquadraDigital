import React, { useContext } from "react";
import {
  Header,
  Footer,
  FormRegistroBairro,
  FormEditarBairro,
  ListaBAIRRO
} from "../../Components";
import { bairroContext } from "../../Contexts/bairroContext";


const PagBairro = () => {
  const { bairroAtual } = useContext(bairroContext)

  return (
    <>
      <Header />
      {bairroAtual ? (
        <FormEditarBairro/>
      ) : (
        <FormRegistroBairro/>
      )}
      <ListaBAIRRO/>
      <Footer />
    </>
  );
};
export default PagBairro;
