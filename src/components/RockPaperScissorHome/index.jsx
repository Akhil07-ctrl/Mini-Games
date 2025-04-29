import {useState} from 'react'
import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import './RockPaperScissorHome.css'

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
      setScore(prev => prev + 1)
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
      <div className="game-header">
        <Link to="/rock-paper-scissor" className='rock-paper-scissor-back-btn'>
            <BiArrowBack /> Back to Rules
        </Link>
        <button type="button" onClick={() => alert('Rules Coming Soon...')}>
            Rules
        </button>
      </div>
      
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
