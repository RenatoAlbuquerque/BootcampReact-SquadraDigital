import styled from "styled-components";

export const PositionContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0px;
`;

export const ListContainer = styled.div`
  align-items: center;
  border: 2px solid grey;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PositionTitle = styled.div`
  background-color: #374151;
  border-radius: 8px 8px 0px 0px;
  color: #fff;
  margin-bottom: 20px;
  padding: 10px;
  text-align: center;
  width: 100%;
`;
export const TitleList = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.5rem;
`;

export const BtnUpdate = styled.button`
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
  padding: 1px 5px;
  border-radius: 10px;
  border: 2px solid transparent;
  &:hover {
    background-color: #000;
    border-color: #fff;
  }
`;

export const InfoListActive = styled.div`
  background-color: black;
  border-radius: 5px;
  border-right: 10px solid transparent;
  border-left: 10px solid green;
  cursor: pointer;
  color: orange;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
  margin: 10px;
  padding: 10px 20px;
  width: 550px;
  &:hover {
    background-color: gray;
  }
`;

export const InfoListDesabled = styled.div`
  cursor: pointer;
  background-color: black;
  border-radius: 5px;
  border-left: 10px solid transparent;
  border-right: 10px solid red;
  cursor: pointer;
  color: orange;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
  margin: 10px;
  padding: 10px 20px;
  width: 550px;
  &:hover {
    background-color: gray;
  }
`;
