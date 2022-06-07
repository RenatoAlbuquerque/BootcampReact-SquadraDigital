import { api } from "../../Services/api"

export const codigoUfParaSigla = async (municipios) => {
  const dataUf = await pegarTodasUfs()
  if(dataUf){
    const novaArray = municipios.map((municipio) => {
      const [uf] = dataUf.filter((uf) => uf.codigoUF === municipio.codigoUF)
      return { ...municipio, sigla: uf.sigla }
    })
    return novaArray
  }
  return municipios
}

export const pegarTodasUfs = async () => {
  try {
    const { data } = await api.get("/uf");
    return data
  } catch (error) {
    console.log(error);
  }
};

export const listarTodosMunicipios = async () => {
  try {
    const { data } = await api.get("/municipio");
    const municipios = await codigoUfParaSigla(data)
    return municipios
  } catch (error) {
    console.log(error);
  }
};