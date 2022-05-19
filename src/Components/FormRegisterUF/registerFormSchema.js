import * as Yup from "yup";

export default Yup.object().shape({
  nome: Yup.string()
    .required("O Preenchimento do Nome é obrigatório!")
    .min(3, "O minimo de caracteres permitido são 3."),
  sigla: Yup.string()
    .required("O Preenchimento da Sigla é obrigatória!")
    .max(3, "O máximo de caracteres permitido são 3."),
});
