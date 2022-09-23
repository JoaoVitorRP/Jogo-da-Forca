import styled from "styled-components";
import words from "./words.js";
import Forca0 from "./assets/forca0.png";

export default function Top(props) {
  const {
    setCorrect,
    setNoAccent,
    setWord,
    underscore,
    setUnderscore,
    setStatus,
    setMistakes,
    img,
    setImg,
    setClicked,
    wordColor,
    setWordColor,
    backgroundColor,
    setBackgroundColor,
  } = props;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function PickWord() {
    const wordIndex = getRandomInt(0, words.length);

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

  function DarkMode() {
    setBackgroundColor("#565656");
    underscore.includes(`_`)
      ? setWordColor("#ffffff")
      : setWordColor(wordColor);
  }

  function LightMode() {
    setBackgroundColor("#ffffff");
    underscore.includes(`_`)
      ? setWordColor("#000000")
      : setWordColor(wordColor);
  }

  return (
    <TopDiv>
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
    </TopDiv>
  );
}

const TopDiv = styled.div`
  position: relative;

  width: 900px;
  padding: 20px;
`;

const Img = styled.img`
  width: 350px;
`;

const PickButton = styled.button`
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

const ModeButton = styled.button`
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
