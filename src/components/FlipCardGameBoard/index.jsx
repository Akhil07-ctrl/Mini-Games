import {Link} from "react-router-dom";
import React from "react";
import Data from "../FlipCardData";
import Card from "../FlipCardItem";
import "./index.css";

function FlipCardGameBoard() {
  // Initialize moves state from localStorage if present, otherwise 0.
  const [moves, setMoves] = React.useState(() => {
    const savedMoves = localStorage.getItem("moves");
    return savedMoves ? parseInt(savedMoves, 10) : 0;
  });

  // Initialize bestMoves state from localStorage if present, otherwise null.
  const [bestMoves, setBestMoves] = React.useState(() => {
    const savedBest = localStorage.getItem("bestMoves");
    return savedBest ? parseInt(savedBest, 10) : null;
  });

  const [cardsArray, setCardsArray] = React.useState([]);
  const [firstCard, setFirstCard] = React.useState(null);
  const [secondCard, setSecondCard] = React.useState(null);
  const [stopFlip, setStopFlip] = React.useState(false);
  const [won, setWon] = React.useState(0);
  const [showPopup, setShowPopup] = React.useState(false);

  // Update localStorage whenever moves changes.
  React.useEffect(() => {
    localStorage.setItem("moves", moves);
  }, [moves]);

  // When the game completes, update bestMoves if current moves is lower than stored best.
  React.useEffect(() => {
    if (won === 6) {
      if (bestMoves === null || moves < bestMoves) {
        setBestMoves(moves);
        localStorage.setItem("bestMoves", moves);
      }
    }
  }, [won, moves, bestMoves]);

  // Start a new game and reset moves to zero.
  function NewGame() {
    setTimeout(() => {
      const randomOrderArray = Data.sort(() => 0.5 - Math.random());
      setCardsArray(randomOrderArray);
      // Reset moves to zero for a new game.
      setMoves(0);
      localStorage.setItem("moves", 0);
      setFirstCard(null);
      setSecondCard(null);
      setWon(0);
    }, 1200);
  }

  // Handle selected cards.
  function handleSelectedCards(item) {
    if (firstCard !== null && firstCard.id !== item.id) {
      setSecondCard(item);
    } else {
      setFirstCard(item);
    }
  }

  // Check for a match whenever two cards are selected.
  React.useEffect(() => {
    if (firstCard && secondCard) {
      setStopFlip(true);
      if (firstCard.name === secondCard.name) {
        setCardsArray((prevArray) =>
          prevArray.map((unit) =>
            unit.name === firstCard.name ? { ...unit, matched: true } : unit
          )
        );
        setWon((prevVal) => prevVal + 1);
        removeSelection();
      } else {
        setTimeout(() => {
          removeSelection();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  // Reset selected cards, allow next flip, and update moves.
  function removeSelection() {
    setFirstCard(null);
    setSecondCard(null);
    setStopFlip(false);
    setMoves((prevValue) => prevValue + 1);
  }

  // Start the game for the first time.
  React.useEffect(() => {
    NewGame();
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  }

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flip-card-game-board-container">
      <div className="header">
        <h1>Flip Card</h1>
      </div>
      <div className="board">
        {cardsArray.map((item) => (
          <Card
            item={item}
            key={item.id}
            handleSelectedCards={handleSelectedCards}
            toggled={
              item === firstCard ||
              item === secondCard ||
              item.matched === true
            }
            stopflip={stopFlip}
          />
        ))}
      </div>
      <div className="comments">
        Moves: {moves}{" "}
        <span style={{ marginLeft: "1rem" }}>
          Best Moves: {bestMoves !== null ? bestMoves : "N/A"}
        </span>
      </div>
      {won === 6 && (
        <div className="comments">
          Congratulations!!! You Won in {moves} moves!
          <br />
          Wanna play again? Click on 'New Game' button below!
        </div>
      )}
      {showPopup && (
          <div className="modal-overlay">
            <div className="modal-content">
              <img
                src="https://res.cloudinary.com/dgsmgz8zl/image/upload/v1742966834/Flip-Card-Rules_a0lj8a.png"
                alt="Rules"
                className="modal-image"
              />
              <button className="close-button" onClick={closePopup}>
                Close
              </button>
            </div>
          </div>
        )}
      <div className="buttons-container">
        <button className="button" onClick={openPopup}>
          Rules
        </button>
        <button className="button" onClick={NewGame}>
          New Game
        </button>
        <Link to="/flip-card-home">
          <button className="button">Back</button>
        </Link>
      </div>
    </div>
  );
}

export default FlipCardGameBoard;
