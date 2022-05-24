import React from "react";
import {
  Header,
  Footer,
  ListaPESSOA,
  FormRegisterPESSOA
} from "../../Components";


const PagPessoa = () => {
  return (
    <>
      <Header />
      <FormRegisterPESSOA/>
      <ListaPESSOA/>
      <Footer />
    </>
  );
};
export default PagPessoa;
