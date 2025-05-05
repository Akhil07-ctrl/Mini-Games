import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from "react-icons/cg"
import Modal from "react-modal"
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage'
import './RockPaperScissorHome.css'

Modal.setAppElement('#root')

const gameStatusConstants = {
  inProgress: 'IN_PROGRESS',
  win: 'WIN',
  lost: 'LOST',
  draw: 'DRAW',
}

const choicesList = [
  {
    id: 'ROCK',
    image:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
    testId: 'rockButton',
    alt: 'rock',
  },
  {
    id: 'SCISSORS',
    image:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
    testId: 'scissorButton',
    alt: 'scissor',
  },
  {
    id: 'PAPER',
    image:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
    testId: 'paperButton',
    alt: 'paper',
  },
]

const emojiImages = {
  win: {
    src: 'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1745667915/Emoji_xy8knk.png',
    alt: 'Smiling face with star eyes',
  },
  lose: {
    src: 'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1745668051/Emoji_2_c5xz5v.png',
    alt: 'Frowning face', // Changed to match test requirements
  },
  draw: {
    src: 'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1745668013/Emoji_1_et72uc.png',
    alt: 'Face without mouth',
  },
}

const headerImages = {
  win: {
    src: 'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1745667915/Emoji_xy8knk.png',
    alt: 'won emoji',
  },
  lose: {
    src: 'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1745668051/Emoji_2_c5xz5v.png',
    alt: 'lose emoji',
  },
  draw: {
    src: 'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1745668013/Emoji_1_et72uc.png',
    alt: 'draw emoji',
  },
}

const RockPaperScissorHome = () => {
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState(gameStatusConstants.inProgress)
  const [userChoice, setUserChoice] = useState(null)
  const [opponentChoice, setOpponentChoice] = useState(null)
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false)
  const [highestScore, setHighestScore] = useState(0)
  
  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = getFromLocalStorage('rockPaperScissor', {
      highestScore: 0
    })
    
    setHighestScore(savedData.highestScore)
  }, [])

  const getRandomChoice = () => {
    const randomIndex = Math.floor(Math.random() * choicesList.length)
    return choicesList[randomIndex]
  }

  const evaluateResult = (user, opponent) => {
    if (user.id === opponent.id) {
      setGameStatus(gameStatusConstants.draw)
    } else if (
      (user.id === 'ROCK' && opponent.id === 'SCISSORS') ||
      (user.id === 'PAPER' && opponent.id === 'ROCK') ||
      (user.id === 'SCISSORS' && opponent.id === 'PAPER')
    ) {
      setGameStatus(gameStatusConstants.win)
      const newScore = score + 1
      setScore(newScore)
      
      // Update highest score if current score is higher
      if (newScore > highestScore) {
        setHighestScore(newScore)
        saveToLocalStorage('rockPaperScissor', {
          highestScore: newScore
        })
      }
    } else {
      setGameStatus(gameStatusConstants.lost)
      setScore(prev => prev - 1) // Allow negative scores
    }
  }

  const handleUserChoice = choice => {
    const opponentSelectedChoice = getRandomChoice()
    setUserChoice(choice)
    setOpponentChoice(opponentSelectedChoice)
    evaluateResult(choice, opponentSelectedChoice)
  }

  const resetGame = () => {
    setGameStatus(gameStatusConstants.inProgress)
    setUserChoice(null)
    setOpponentChoice(null)
  }
  
  const openRulesModal = () => {
    setIsRulesModalOpen(true)
  }

  const closeRulesModal = () => {
    setIsRulesModalOpen(false)
  }

  const renderGameView = () => (
    <>
      <h1>Let&apos;s pick</h1>
      <ul className="choices-container">
        {choicesList.map(choice => (
          <li key={choice.id} className="choice-item">
            <button
              type="button"
              data-testid={choice.testId}
              onClick={() => handleUserChoice(choice)}
              className="choice-button"
              aria-label={`Choose ${choice.id}`}
            >
              <img
                src={choice.image}
                alt={choice.alt}
                className="choice-image"
              />
            </button>
          </li>
        ))}
      </ul>
    </>
  )

  const renderResultView = () => {
    let resultText
    let resultClass
    let emoji

    if (gameStatus === gameStatusConstants.win) {
      resultText = 'YOU WON'
      resultClass = 'result-win'
      emoji = emojiImages.win
    } else if (gameStatus === gameStatusConstants.lost) {
      resultText = 'YOU LOSE'
      resultClass = 'result-lose'
      emoji = emojiImages.lose
    } else {
      resultText = 'IT IS DRAW'
      resultClass = 'result-draw'
      emoji = emojiImages.draw
    }

    return (
      <div className="result-view">
        <div className="choices-display">
          <div className="choice-wrapper">
            <p>You</p>
            <img
              src={userChoice.image}
              alt={`your ${userChoice.alt}`}
              className="choice-image"
            />
          </div>
          <div className="choice-wrapper">
            <p>Opponent</p>
            <img
              src={opponentChoice.image}
              alt={`opponent ${opponentChoice.alt}`}
              className="choice-image"
            />
          </div>
        </div>
        <div className={`result-text ${resultClass}`}>
          <p>{resultText}</p>
          <img
            src={emoji.src}
            alt={emoji.alt}
            className="result-emoji"
            data-testid={`${gameStatus.toLowerCase()}-emoji`}
          />
        </div>
        <button type="button" onClick={resetGame} className="play-again-button">
          Play Again
        </button>
      </div>
    )
  }

  return (
    <div
      className="rock-paper-scissor-container"
      data-testid="rockPaperScissors"
    >
      <div className="rock-paper-scissor-header-buttons">
        <Link to="/rock-paper-scissor">
            <BiArrowBack /> Back to Rules
        </Link>
        <button type="button" onClick={openRulesModal}>
            Rules
        </button>
      </div>

      <hr style={{ border: '1px solid black', margin: '3px auto', width: '100%', height: '0' }} />
      
      {/* Rules Modal */}
      <Modal
        isOpen={isRulesModalOpen}
        onRequestClose={closeRulesModal}
        contentLabel="Game Rules"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h2>Rules</h2>
          <button
            onClick={closeRulesModal}
            className="close-button"
            data-testid="close"
          >
            <CgClose />
          </button>
        </div>

        <div className="rules-content">
          <ul className="rules-list">
            <li>
              Rock beats Scissors
            </li>
            <li>
              Scissors beats Paper
            </li>
            <li>
              Paper beats Rock
            </li>
            <li>
              If both players choose the same option, it's a draw
            </li>
            <li>
              Win: +1 point
            </li>
            <li>
              Lose: -1 point
            </li>
            <li>
              Draw: No points
            </li>
          </ul>

          <h3>Available Choices:</h3>
          <ul className="choices-list-in-modal">
            {choicesList.map(choice => (
              <li key={choice.id}>
                <img src={choice.image} alt={choice.alt} />
                <span>{choice.id.toLowerCase()}</span>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
      
      <div>
        <h1>ROCK PAPER SCISSOR</h1>
      </div>

      <div className="rock-paper-scissor-header">
        <h2>
          Rock
          <br />
          Paper
          <br />
          Scissor
        </h2>

        <div className="header-image-container">
          {gameStatus === gameStatusConstants.win && (
            <img
              src={headerImages.win.src}
              alt={headerImages.win.alt}
              className="header-image"
            />
          )}
          {gameStatus === gameStatusConstants.lost && (
            <img
              src={headerImages.lose.src}
              alt={headerImages.lose.alt}
              className="header-image"
            />
          )}
          {gameStatus === gameStatusConstants.draw && (
            <img
              src={headerImages.draw.src}
              alt={headerImages.draw.alt}
              className="header-image"
            />
          )}
        </div>

        <div className="rock-paper-scissor-score-container">
          <p className="score-text">Score</p>
          <p className="score-value" data-testid="score">
            {score}
          </p>
          <p className="highest-score-text">Highest Score</p>
          <p className="highest-score-value">
            {highestScore}
          </p>
        </div>
      </div>

      <div className="rock-paper-scissor-game-container">
        {gameStatus === gameStatusConstants.inProgress
          ? renderGameView()
          : renderResultView()}
      </div>
    </div>
  )
}

export default RockPaperScissorHome
