import { api } from "../../Services/api"

export const listarTodosBairros = async () => {
  try {
    const { data } = await api.get("/bairro");
    const bairro = await codigoMunicipioParaBairro(data)
    return bairro
  } catch (error) {
    console.log(error);
  }
};

export const codigoMunicipioParaBairro = async (bairros) => {
  const dataMunicipio = await pegarTodosMunicipios()
  if(dataMunicipio){
    const novaArray = bairros.map((bairro) => {
      const [municipio] = dataMunicipio.filter((uf) => uf.codigoMunicipio === bairro.codigoMunicipio)
      return { ...bairro, municipio: municipio.nome }
    })
    return novaArray
  }
  return bairros
}

export const pegarTodosMunicipios = async () => {
  try {
    const { data } = await api.get("/municipio");
    return data
  } catch (error) {
    console.log(error);
  }
};
