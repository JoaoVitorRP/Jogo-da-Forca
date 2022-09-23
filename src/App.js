import { useState } from "react";
import styled from "styled-components";

import Forca0 from "./assets/forca0.png";
import Forca1 from "./assets/forca1.png";
import Forca2 from "./assets/forca2.png";
import Forca3 from "./assets/forca3.png";
import Forca4 from "./assets/forca4.png";
import Forca5 from "./assets/forca5.png";
import Forca6 from "./assets/forca6.png";
import letters from "./letters";
import words from "./words.js";
import GlobalStyle from "./globalStyles";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function App() {
  const [word, setWord] = useState([]);
  const [noAccent, setNoAccent] = useState([]);
  const [underscore, setUnderscore] = useState([]);
  const [mistakes, setMistakes] = useState(1);
  const [img, setImg] = useState(Forca0);
  const [status, setStatus] = useState(true);
  const [clicked, setClicked] = useState([]);
  const [guess, setGuess] = useState("");
  const [correct, setCorrect] = useState("");
  const [wordColor, setWordColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const wordIndex = getRandomInt(0, words.length);

  function PickWord() {
    const correctWord = words[wordIndex];
    setCorrect(correctWord);
    const wordArray = Array.from(correctWord);

    let noAccentWord = correctWord
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    noAccentWord = Array.from(noAccentWord);
    setNoAccent(noAccentWord);

    const underscoreArray = wordArray.map(() => `_`);

    setWord(wordArray);
    setUnderscore(underscoreArray);

    setStatus(false);

    setMistakes(1);
    setImg(Forca0);
    setClicked([]);

    backgroundColor === "#ffffff"
      ? setWordColor("#000000")
      : setWordColor("#ffffff");
  }

  function CheckLetter(letter) {
    const noAccentCopy = [...noAccent];
    let underscoreCopy = [...underscore];

    if (noAccentCopy.includes(letter)) {
      noAccentCopy.map((l, index) =>
        letter === l ? (underscoreCopy[index] = word[index]) : null
      );

      if (!underscoreCopy.includes(`_`)) {
        setWordColor("#27ae60");
        setStatus(true);
      }
    } else {
      setMistakes(mistakes + 1);
      if (mistakes === 1) {
        setImg(Forca1);
      } else if (mistakes === 2) {
        setImg(Forca2);
      } else if (mistakes === 3) {
        setImg(Forca3);
      } else if (mistakes === 4) {
        setImg(Forca4);
      } else if (mistakes === 5) {
        setImg(Forca5);
      } else if (mistakes === 6) {
        setImg(Forca6);
        setWordColor("#ff0000");
        setStatus(true);

        underscoreCopy = Array.from(correct);
      }
    }

    const clickedCopy = [...clicked, letter];
    setClicked(clickedCopy);

    setUnderscore(underscoreCopy);
  }

  function CreateLetter(props) {
    let letter = props.letter;
    letter = letter.toLowerCase();

    return (
      <LetterButton
        status={clicked.includes(letter) ? true : status}
        onClick={() => {
          CheckLetter(letter);
        }}
        disabled={clicked.includes(letter) ? true : status}
        data-identifier="letter"
      >
        {props.letter}
      </LetterButton>
    );
  }

  function CheckGuess() {
    const guessCopy = guess.toLowerCase();
    const correctArray = Array.from(correct);

    if (guessCopy === correct) {
      setWordColor("#27ae60");
    } else {
      setWordColor("#ff0000");
      setImg(Forca6);
    }

    setStatus(true);
    setUnderscore(correctArray);
    setGuess("");
  }

  function DarkMode() {
    setBackgroundColor("#565656");
    underscore.includes(`_`) ? (setWordColor("#ffffff")) : setWordColor(wordColor);
  }

  function LightMode() {
    setBackgroundColor("#ffffff");
    underscore.includes(`_`) ? setWordColor("#000000") : setWordColor(wordColor);
  }

  return (
    <>
      <GlobalStyle />
      <Background color={backgroundColor}>
        <Top>
          <Img src={img} alt="Forca" data-identifier="game-image" />
          <PickButton onClick={PickWord} data-identifier="choose-word">
            Escolher Palavra
          </PickButton>
          <Modes>
            <ModeButton onClick={DarkMode}>Dark Mode</ModeButton>
            <ModeButton onClick={LightMode}>Light Mode</ModeButton>
          </Modes>
          <Text color={wordColor} data-identifier="word">
            {underscore.map((l) => l)}
          </Text>
        </Top>
        <Keyboard>
          {letters.map((l, index) => (
            <CreateLetter letter={l} key={index} />
          ))}
        </Keyboard>
        <Guess color={backgroundColor}>
          Já sei a palavra!
          <InputBox
            placeholder="Insira seu chute aqui. Ex: nação"
            disabled={status}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? CheckGuess() : null)}
            data-identifier="type-guess"
          ></InputBox>
          <GuessButton
            status={status}
            disabled={status}
            onClick={CheckGuess}
            data-identifier="guess-button"
          >
            Chutar
          </GuessButton>
        </Guess>
      </Background>
    </>
  );
}

const GlobalButtonConfig = styled.button`
  height: 40px;
  border-radius: 5px;

  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 15px;
`;

const Background = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 100vh;

  background: ${(props) => (props.color ? props.color : "#ffffff")};
`;

const Top = styled.div`
  position: relative;

  width: 900px;
  padding: 20px;
`;

const Img = styled.img`
  width: 350px;
`;

const PickButton = styled(GlobalButtonConfig)`
  position: absolute;
  top: 50px;
  right: 20px;

  width: 170px;
  background: #27ae60;
  border: none;
  box-shadow: 1px 1px 5px #27ae60;

  color: #ffffff;
`;

const Modes = styled.div`
  position: absolute;

  top: 130px;
  right: 20px;

  display: flex;
  flex-direction: column;
`;

const ModeButton = styled(GlobalButtonConfig)`
  width: 100px;
  margin-top: 10px;
  background: #e1ecf4;
  border: 1px solid #39739d;
  box-shadow: 1px 1px 5px #1c1c1c;

  color: #39739d;

  &:hover {
    filter: brightness(0.8);
  }
`;

const Text = styled.h1`
  position: absolute;
  bottom: 40px;
  right: 20px;

  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 50px;
  letter-spacing: 5px;
  color: ${(props) => (props.color ? props.color : "#000000")};
`;

const Keyboard = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 650px;
  margin-bottom: 20px;
`;

const LetterButton = styled(GlobalButtonConfig)`
  width: 40px;
  margin: 5px;
  background: ${(props) => (props.status ? "#9faab5" : "#e1ecf4")};
  border: ${(props) => (props.status ? "none" : "1px solid #39739d")};
  box-shadow: ${(props) =>
    props.status ? "none" : "1px 1px 5px #1c1c1c"};

  color: ${(props) => (props.status ? "#54575c" : "#39739d")};

  cursor: ${(props) => (props.status ? "default" : "pointer")};

  &:hover {
    filter: ${(props) => (props.status ? "brigthness(1)" : "brightness(0.8)")};
  }
`;

const Guess = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${(props) => (props.color === "#ffffff" ? "#000000" : "#ffffff")};

  * {
    margin: 0 10px;
  }
`;

const InputBox = styled.input`
  height: 35px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #b8b8b8;
  padding: 10px;
  background: #fafafa;

  ::placeholder {
    font-style: italic;
  }
`;

const GuessButton = styled(LetterButton)`
  width: 65px;
`;
