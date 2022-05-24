import * as Yup from "yup";

export default Yup.object().shape({
  nome: Yup.string()
    .required("*Preenchimento Obrigatório!")
    .min(3, "O minimo de caracteres são 3."),
  municipio: Yup.string()
    .required("*Preenchimento Obrigatório!")
    .max(3, "O máximo de caracteres permitido são 3."),
  status: Yup.string().required("*Preenchimento Obrigatório!"),
});
