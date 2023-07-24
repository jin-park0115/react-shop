import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  background: ${({theme} : {theme:any}) =>theme.bgCOlor};
  color: ${({theme}: {theme:any}) => theme.textColor};
  width: 100%;
  height: 100px;
  justify-content: space-evenly;
  align-items: center;
`
const Category = styled.ul`
  display: flex;
  width: 190px;
  justify-content: space-between;
  color: ${({theme}: {theme:any}) => theme.textColor};
  cursor: pointer;
`

const DivInput = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({theme}: {theme:any}) => theme.textColor};
`
const Input = styled.input`
  padding: 20px;
  border-radius: 5px;
  border: none;
  background: #6e6767;
  color: ${({theme}: {theme:any}) => theme.textColor};

`

export default function Head() {

  return (
    <Header>
      <div style={{ fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>React Shop</div>
      <Category>
        <li>패션</li>
        <li>액세사리</li>
        <li>디지털</li>
      </Category>
      <DivInput>
        <Input type="text" placeholder="검색"></Input>
      </DivInput>
    </Header>
  );
}
