import { useState } from "react";

import "./css/reset.css";
import "./css/style.css";

import Forca0 from "./assets/forca0.png";
import Forca1 from "./assets/forca1.png";
import Forca2 from "./assets/forca2.png";
import Forca3 from "./assets/forca3.png";
import Forca4 from "./assets/forca4.png";
import Forca5 from "./assets/forca5.png";
import Forca6 from "./assets/forca6.png";
import letters from "./letters";
import words from "./words.js";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function App() {
  const [word, setWord] = useState([]);
  const [underscore, setUnderscore] = useState([]);
  const [clickEnabled, setClickEnabled] = useState(false);

  const wordIndex = getRandomInt(0, words.length);

  function GenerateWord() {
    const correctWord = words[wordIndex];

    const wordArray = Array.from(correctWord);

    const newArray = wordArray.map((l) => `_`);

    setWord(wordArray);
    setUnderscore(newArray);
  }

  function CheckLetter(letter) {
    const newArray = [...word];
    const underscoreArray = [...underscore];
    letter = letter.toLowerCase();
    console.log(letter);

    if (newArray.includes(letter)) {
      newArray.map((l, index) => {
        if (letter === l) {
          underscoreArray[index] = l;
        }
      });
    }

    setUnderscore(underscoreArray);
  }

  function PickWord() {
    GenerateWord();

    setClickEnabled(true);
  }

  function CreateLetter(props) {
    return (
      <button
        className="letter"
        onClick={
          clickEnabled
            ? () => {
                CheckLetter(props.letter);
              }
            : () => {}
        }
      >
        {props.letter}
      </button>
    );
  }

  return (
    <div className="background">
      <div className="top">
        <img src={Forca0} />
        <button
          className="pick-word"
          onClick={() => {
            PickWord();
          }}
        >
          Escolher Palavra
        </button>
        <h1>{underscore.map((l) => l)}</h1>
      </div>
      <div className="keyboard">
        {letters.map((l, index) => (
          <CreateLetter letter={l} key={index} />
        ))}
      </div>
      <div className="guess">
        Já sei a palavra!
        <input placeholder="Insira seu chute aqui"></input>
        <button>Chutar</button>
      </div>
    </div>
  );
}
