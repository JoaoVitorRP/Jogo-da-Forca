import styled from "styled-components";
import letters from "./letters";
import Forca1 from "./assets/forca1.png";
import Forca2 from "./assets/forca2.png";
import Forca3 from "./assets/forca3.png";
import Forca4 from "./assets/forca4.png";
import Forca5 from "./assets/forca5.png";
import Forca6 from "./assets/forca6.png";

export default function Keyboard(props) {
  const {
    noAccent,
    underscore,
    setUnderscore,
    word,
    setWordColor,
    setStatus,
    mistakes,
    setMistakes,
    setImg,
    correct,
    clicked,
    setClicked,
    status,
  } = props;

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

  return (
    <KeyboardDiv>
      {letters.map((l, index) => (
        <CreateLetter letter={l} key={index} />
      ))}
    </KeyboardDiv>
  );
}

const KeyboardDiv = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: 650px;
  margin-bottom: 20px;
`;

const LetterButton = styled.button`
  width: 40px;
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
