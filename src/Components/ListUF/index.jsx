import React, { useState } from "react";
import * as S from "./styles";
const objeto = [
  {
    cod: 47,
    sigla: 'RN',
    nome: 'Rio Grande Do Norte',
    status: 1
  },
  {
    cod: 48,
    sigla: 'PE',
    nome: 'PERNAMBUCO',
    status: 2
  },
]

const ListUF = () => {
  const [uf, setUf] = useState(objeto)

  const changeStatus = (obj) => {

  }

  const updateItem = (obj) => {

  }

  return (
    <S.PositionContainer>
      <S.ListContainer>
        <S.PositionTitle><S.TitleList>UF'S CADASTRADAS</S.TitleList></S.PositionTitle>
        {uf ? uf.map((obj)=>(
          obj.status === 1 ? 
        <S.InfoListActive key={obj.cod}>
          <p>{obj.cod} - <S.BtnUpdate onClick={updateItem(obj)}>{obj.sigla} - {obj.nome}</S.BtnUpdate> - <S.BtnUpdate onClick={() => changeStatus(obj)}>ATIVADO</S.BtnUpdate></p>
        </S.InfoListActive>
          : 
        <S.InfoListDesabled key={obj.cod}>
          <p>{obj.cod} - <S.BtnUpdate onClick={updateItem(obj)}>{obj.sigla} - {obj.nome}</S.BtnUpdate> - <S.BtnUpdate onClick={() => changeStatus(obj)}>DESATIVADO</S.BtnUpdate></p>
        </S.InfoListDesabled>
        )): 'Não há UFs Cadastradas'}
      </S.ListContainer>
    </S.PositionContainer>
  );
};

export default ListUF;
