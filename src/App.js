import React from "react";

import "./css/reset.css";
import "./css/style.css";

import Forca0 from "./assets/forca0.png";
import Forca1 from "./assets/forca1.png";
import Forca2 from "./assets/forca2.png";
import Forca3 from "./assets/forca3.png";
import Forca4 from "./assets/forca4.png";
import Forca5 from "./assets/forca5.png";
import Forca6 from "./assets/forca6.png";

function CreateLetter(props) {
  return <button className="letter">{props.letter}</button>;
}

export default function App() {
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  return (
    <div class="background">
      <div className="top">
        <img src={Forca0} />
        <button className="pick-word">Escolher Palavra</button>
      </div>
      <div className="keyboard">
        {letters.map((l, index) => (
          <CreateLetter letter={l} key={index} />
        ))}
      </div>
      <div className="guess">
        <h1>Já sei a palavra!</h1>
        <input placeholder="Insira seu chute aqui"></input>
        <button>Chutar</button>
      </div>
    </div>
  );
}
