import * as Yup from "yup";

const cepNumero = /[0-9]{5}-[0-9]{3}/;

export default Yup.object().shape({
  nomeRua: Yup.string()
    .required("*Preenchimento Obrigatório!")
    .min(3, "O minimo de caracteres são 3."),
  numero: Yup.number().required("*Preenchimento Obrigatório!"),
  complemento: Yup.string().required("*Preenchimento Obrigatório!"),
  cep: Yup.string()
    .required("*Preenchimento Obrigatório!")
    .min(8, "O CEP possui 7 números.")
    .matches(cepNumero, "Formato 12345-678"),
});
