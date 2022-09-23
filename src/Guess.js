import styled from "styled-components";
import { useState } from "react";

import Forca6 from "./assets/forca6.png";

export default function Guess(props) {
  const {
    correct,
    setWordColor,
    setImg,
    status,
    setStatus,
    setUnderscore,
    backgroundColor,
  } = props;

  const [guess, setGuess] = useState("");

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

  return (
    <GuessDiv color={backgroundColor}>
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
    </GuessDiv>
  );
}

const GuessDiv = styled.div`
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

const GuessButton = styled.button`
  width: 65px;
  margin: 5px;
  background: ${(props) => (props.status ? "#9faab5" : "#e1ecf4")};
  border: ${(props) => (props.status ? "none" : "1px solid #39739d")};
  box-shadow: ${(props) => (props.status ? "none" : "1px 1px 5px #1c1c1c")};

  color: ${(props) => (props.status ? "#54575c" : "#39739d")};

  cursor: ${(props) => (props.status ? "default" : "pointer")};

  &:hover {
    filter: ${(props) => (props.status ? "brigthness(1)" : "brightness(0.8)")};
  }
`;
