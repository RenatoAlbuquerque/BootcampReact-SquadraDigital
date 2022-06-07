import * as Yup from "yup";

export default Yup.object().shape({
  nome: Yup.string()
    .required("*Preenchimento Obrigatório!")
    .min(3, "O minimo de caracteres são 3."),
  codigoUF: Yup.number().required("*Preenchimento Obrigatório!"),
  status: Yup.number().required("*Preenchimento Obrigatório!"),
});
