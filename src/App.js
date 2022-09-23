import { useState } from "react";
import styled from "styled-components";

import Forca0 from "./assets/forca0.png";
import GlobalStyle from "./globalStyles";
import Top from "./Top";
import Keyboard from "./Keyboard";
import Guess from "./Guess";

export default function App() {
  const [word, setWord] = useState([]);
  const [noAccent, setNoAccent] = useState([]);
  const [underscore, setUnderscore] = useState([]);
  const [mistakes, setMistakes] = useState(1);
  const [img, setImg] = useState(Forca0);
  const [status, setStatus] = useState(true);
  const [clicked, setClicked] = useState([]);
  const [correct, setCorrect] = useState("");
  const [wordColor, setWordColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  return (
    <>
      <GlobalStyle />
      <Background color={backgroundColor}>
        <Top
          setCorrect={setCorrect}
          setNoAccent={setNoAccent}
          setWord={setWord}
          underscore={underscore}
          setUnderscore={setUnderscore}
          setStatus={setStatus}
          setMistakes={setMistakes}
          img={img}
          setImg={setImg}
          setClicked={setClicked}
          wordColor={wordColor}
          setWordColor={setWordColor}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
        />
        <Keyboard
          noAccent={noAccent}
          underscore={underscore}
          setUnderscore={setUnderscore}
          word={word}
          setWordColor={setWordColor}
          setStatus={setStatus}
          mistakes={mistakes}
          setMistakes={setMistakes}
          setImg={setImg}
          correct={correct}
          clicked={clicked}
          setClicked={setClicked}
          status={status}
        />
        <Guess
          correct={correct}
          setWordColor={setWordColor}
          setImg={setImg}
          status={status}
          setStatus={setStatus}
          setUnderscore={setUnderscore}
          backgroundColor={backgroundColor}
        />
      </Background>
    </>
  );
}

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;

  background: ${(props) => (props.color ? props.color : "#ffffff")};
`;
