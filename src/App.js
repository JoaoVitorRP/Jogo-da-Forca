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
  const [noAccent, setNoAccent] = useState([]);
  const [underscore, setUnderscore] = useState([]);
  const [clickEnabled, setClickEnabled] = useState(false);
  const [mistakes, setMistakes] = useState(1);
  const [img, setImg] = useState(Forca0);

  const wordIndex = getRandomInt(0, words.length);

  function PickWord() {
    const correctWord = words[wordIndex];
    const wordArray = Array.from(correctWord);

    let noAccentWord = correctWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    noAccentWord = Array.from(noAccentWord);
    setNoAccent(noAccentWord);

    const underscoreArray = wordArray.map((l) => `_`);

    setWord(wordArray);
    setUnderscore(underscoreArray);

    setClickEnabled(true);
  }

  function CheckLetter(letter) {
    const noAccentCopy = [...noAccent];
    const underscoreCopy = [...underscore];
    letter = letter.toLowerCase();
    console.log(letter);

    if (noAccentCopy.includes(letter)) {
      noAccentCopy.map((l, index) => {
        if (letter === l) {
          underscoreCopy[index] = word[index];
        }
      });
    } else {
      setMistakes(mistakes + 1);
      console.log(mistakes);
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
      }
    }

    setUnderscore(underscoreCopy);
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
        <img src={img} alt="Forca" />
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
