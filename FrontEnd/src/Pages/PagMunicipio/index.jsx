import React, { useContext } from "react";
import {
  Header,
  Footer,
  FormRegistroMunicipio,
  FormEditarMunicipio,
  ListaMUNICIPIO
} from "../../Components";
import { municipioContext } from "../../Contexts/municipioContext";


const PagMunicipio = () => {
  const {municipioAtual} = useContext(municipioContext)

  return (
    <>
      <Header />
      {municipioAtual ? (
        <FormEditarMunicipio/>
      ):(
        <FormRegistroMunicipio/>
      )}
      <ListaMUNICIPIO/>
      <Footer />
    </>
  );
};
export default PagMunicipio;
