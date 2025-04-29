import React, {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'

import './index.css'

const cardsData = [
  {
    id: 0,
    name: 'tiger',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-tiger-img.png',
  },
  {
    id: 1,
    name: 'lion',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-lion-img.png',
  },
  {
    id: 2,
    name: 'rat',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-rat-img.png',
  },
  {
    id: 3,
    name: 'hen',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-hen-img.png',
  },
  {
    id: 4,
    name: 'elephant',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-elephant-img.png',
  },
  {
    id: 5,
    name: 'buffalo',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-buffalo-img.png',
  },
  {
    id: 6,
    name: 'goat',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-goat-img.png',
  },
  {
    id: 7,
    name: 'zebra',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-zebra-img.png',
  },
  {
    id: 8,
    name: 'duck',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-duck-img.png',
  },
  {
    id: 9,
    name: 'pigeon',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-pigeon-img.png',
  },
]

// Create card objects with src property
const emojiImages = cardsData.map(card => ({
  id: card.id,
  name: card.name,
  src: card.image,
}))

// Create duplicates with unique IDs
const duplicated = [
  ...emojiImages,
  ...emojiImages.map(card => ({
    ...card,
    id: card.id + emojiImages.length,
  })),
]

const shuffleArray = arr => arr.sort(() => 0.5 - Math.random())

const CardFlipMemoryGameHome = () => {
  const location = useLocation()
  const [cards, setCards] = useState(shuffleArray([...duplicated]))
  const [flippedIndices, setFlippedIndices] = useState([])
  const [matchedIndices, setMatchedIndices] = useState([])
  const [flipCount, setFlipCount] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(120)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isWon, setIsWon] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  // Start timer when coming from rules page
  useEffect(() => {
    if (location.pathname === '/card-flip-memory-game-home') {
      setIsTimerRunning(true)
    }
  }, [location.pathname])

  // Timer
  useEffect(() => {
    let timer
    if (isTimerRunning && !isGameOver && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (!isGameOver && timeLeft === 0) {
      setIsGameOver(true)
    }
    return () => clearTimeout(timer)
  }, [timeLeft, isGameOver, isTimerRunning])

  // Handle card matching
  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices
      const isMatch = cards[first].name === cards[second].name

      if (isMatch) {
        setMatchedIndices([...matchedIndices, first, second])
        setScore(prev => prev + 1)
      }

      setTimeout(
        () => {
          setFlippedIndices([])
          setFlipCount(prev => prev + 1)
        },
        isMatch ? 0 : 2000,
      )
    }
  }, [flippedIndices, cards])

  // Check for game win
  useEffect(() => {
    if (matchedIndices.length === cards.length && cards.length > 0) {
      setIsGameOver(true)
      setIsWon(true)
    }
  }, [matchedIndices, cards.length])

  const handleCardClick = index => {
    if (
      flippedIndices.length === 2 ||
      flippedIndices.includes(index) ||
      matchedIndices.includes(index)
    )
      return

    setFlippedIndices([...flippedIndices, index])
  }

  const formatTime = seconds => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0')
    const sec = String(seconds % 60).padStart(2, '0')
    return `${min}:${sec}`
  }

  const resetGame = () => {
    const reshuffled = shuffleArray([...duplicated])
    setCards(reshuffled)
    setFlippedIndices([])
    setMatchedIndices([])
    setFlipCount(0)
    setScore(0)
    setTimeLeft(120)
    setIsGameOver(false)
    setIsWon(false)
    setIsTimerRunning(true)
  }

  if (isGameOver) {
    return (
      <div className="game-container">
        <h1>{isWon ? 'Congratulations' : 'Better luck next time'}</h1>
        <h2>
          {isWon
            ? 'You matched all of the cards in record time'
            : 'You did not match all of the cards in record time'}
        </h2>
        <img
          src={
            isWon
              ? 'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1745817341/03_Optimistic_sfzjgs.png'
              : 'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1745817370/apwofspv4aohi8zpgmhk.png'
          }
          alt={isWon ? 'grinning face with big eyes' : 'neutral face'}
        />
        <p>No.of Flips - {flipCount}</p>
        <button onClick={resetGame}>Play Again</button>
      </div>
    )
  }

  return (
    <div className="game-container">

      <div className="game-header">
        <Link to="/card-flip-memory-game">
            <BiArrowBack /> Back to Rules
        </Link>
        <button type="button" onClick={() => alert('Rules Coming Soon...')}>
            Rules
        </button>
      </div>

      <h1 className='card-flip-title'>Card-Flip Memory Game</h1>

      <div className='timer-score-count'>
        <p>Card flip count - {flipCount}</p>
        <p>Time left - {formatTime(timeLeft)}</p>
        <p>Score - {score}</p>
      </div>
      
      <ul className="cards-list">
        {cards.map(card => (
          <li key={card.id}>
            <button
              data-testid={card.name}
              onClick={() => handleCardClick(card.id)}
              disabled={flippedIndices.length >= 2}
            >
              {flippedIndices.includes(card.id) ||
              matchedIndices.includes(card.id) ? (
                <img src={card.src} alt={card.name} />
              ) : (
                '❓'
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CardFlipMemoryGameHome
