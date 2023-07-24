import {useState} from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './style/GlobalStyles';
import { lightTheme, darkTheme } from './style/theme';
import Head from './components/Head'
import Main from './components/Main'
import { Carousel } from './components/Carousel';
import Home from './components/Home';

const Button = styled.button`
  width: 100px;
  height: 50px;
  position: absolute;
  top: 23px;
  right: 15%;
`



function App() {
  const [theme, setTheme] = useState("dark")
  const isLight = theme ==="light";

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme("dark");
    } else{
      setTheme("light");
    }
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyle theme={undefined}/>
        <Head/>
        <Carousel/>
        <Home/>
        <Button onClick={toggleTheme}>{isLight ? "dark" : 'light'}</Button>
        <Main/>
      </>
    </ThemeProvider>
  )
}

export default App
