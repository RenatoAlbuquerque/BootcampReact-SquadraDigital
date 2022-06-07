import * as Yup from "yup";

export default Yup.object().shape({
  rua: Yup.string()
    .required("*Preenchimento Obrigatório!")
    .min(3, "O minimo de caracteres são 3."),
  numero: Yup.number().required("*Preenchimento Obrigatório!"),
  complemento: Yup.string().required("*Preenchimento Obrigatório!"),
  codigoUF: Yup.number().required("*Preenchimento Obrigatório!"),
  codigoMunicipio: Yup.number().required("*Preenchimento Obrigatório!"),
  codigoBairro: Yup.number().required("*Preenchimento Obrigatório!"),
});
