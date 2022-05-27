import * as Yup from "yup";

export default Yup.object().shape({
  // FORMULÁRIO PESSOA
  nome: Yup.string()
    .required("*Preenchimento Obrigatório!")
    .min(3, "O minimo de caracteres são 3."),
  sobrenome: Yup.string().required("*Preenchimento Obrigatório!"),
  login: Yup.string().required("*Preenchimento Obrigatório!"),
  senha: Yup.string().required("*Preenchimento Obrigatório!"),
  idade: Yup.number().required("*Preenchimento Obrigatório!"),
  status: Yup.string().required("*Preenchimento Obrigatório!"),
  // FORMULÁRIO ENDEREÇO
  rua: Yup.string()
    .required("*Preenchimento Obrigatório!")
    .min(3, "O minimo de caracteres são 3."),
  numero: Yup.number().required("*Preenchimento Obrigatório!"),
  complemento: Yup.string().required("*Preenchimento Obrigatório!"),
  codigoUF: Yup.number().required("*Preenchimento Obrigatório!"),
  codigoMunicipio: Yup.number().required("*Preenchimento Obrigatório!"),
  codigoBairro: Yup.number().required("*Preenchimento Obrigatório!"),
});
