//css
import "./App.css";

//react
import { useCallback, useEffect, useState } from "react";

//data
import { wordsList } from "./utils/words";

//components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

function App() {
  const tentativas = 5;
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, SetpickedWord] = useState("");
  const [pickedCategory, setpickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(tentativas);
  const [score, setScore] = useState(0);
  //escolhe palavra aleátoria e categoria
  const pickWordAndCategory = useCallback(() => {
    //escolhe categoria aleatoria
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    //escolhe palavra aleatoria da categoria
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    return { word, category };
  }, [words]);
  //inicia o jogo
  const startGame = useCallback(() => {
    clearletterStates();
    const { word, category } = pickWordAndCategory();

    //cria um arrau e  armazena as letras da palavra
    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letters) => letters.toLowerCase());

    //seta os states
    SetpickedWord(word);
    setpickedCategory(category);
    setLetters(wordLetters);
    setGameStage(stages[1].name);
  }, [pickedCategory]);

  //processa letra que o usuario digitar
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    //check para ver se a letra já foi usada
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    //push letras utilizadas ou remove 1 chance
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };
  const clearletterStates = () => {
    setGuessedLetters([]);
    setWrrongLetters([]);
  };

  //verifica se as tentativas acabaram
  useEffect(() => {
    if (guesses <= 0) {
      //resetar todos os states
      clearletterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  //condição de vitoria
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    if (
      guessedLetters.length === uniqueLetters.length &&
      gameStage === stages[1].name
    ) {
      //adiciona score
      setScore((actualScore) => (actualScore += 100));
      setTimeout(() => {
        startGame();
      }, 1000);
    }
  }, [guessedLetters, letters, startGame]);
  //reinicia o jogo
  const retry = () => {
    setScore(0);
    setGuesses(tentativas);
    setGameStage(stages[0].name);
  };
  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
