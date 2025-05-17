import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import {CgClose} from "react-icons/cg"
import Modal from "react-modal"
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage'
import './index.css'

// Set the app element for accessibility
try {
  Modal.setAppElement('#root')
} catch (error) {
  console.error('Error setting app element for Modal:', error)
  // Fallback to setting ariaHideApp to false for all modals
}

const cardsData = [
  {
    id: 0,
    name: 'tiger',
    image: 'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-tiger-img.png',
  },
  {
    id: 1,
    name: 'lion',
    image: 'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-lion-img.png',
  },
  {
    id: 2,
    name: 'rat',
    image: 'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-rat-img.png',
  },
  {
    id: 3,
    name: 'hen',
    image: 'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-hen-img.png',
  },
  {
    id: 4,
    name: 'elephant',
    image: 'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-elephant-img.png',
  },
  {
    id: 5,
    name: 'buffalo',
    image: 'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-buffalo-img.png',
  },
  {
    id: 6,
    name: 'goat',
    image: 'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-goat-img.png',
  },
  {
    id: 7,
    name: 'zebra',
    image: 'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-zebra-img.png',
  },
  {
    id: 8,
    name: 'duck',
    image: 'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-duck-img.png',
  },
  {
    id: 9,
    name: 'pigeon',
    image: 'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-pigeon-img.png',
  },
]

const emojiImages = cardsData.map(card => ({
  id: card.id,
  name: card.name,
  src: card.image,
}))

const duplicated = [
  ...emojiImages,
  ...emojiImages.map(card => ({
    ...card,
    id: card.id + emojiImages.length,
  })),
]

const shuffleArray = arr => [...arr].sort(() => Math.random() - 0.5)

// Calculate score based on time and flip count
const calculateScore = (timeSpent, flipCount) => {
  // Base score - higher for faster completion and fewer flips
  // Maximum possible score is 10000 (if completed instantly with minimum flips)
  const timeBonus = Math.max(0, 120 - timeSpent) * 50; // 0-6000 points for time
  const flipBonus = Math.max(0, 100 - flipCount) * 40; // 0-4000 points for minimal flips
  return Math.round(timeBonus + flipBonus);
};

const CardFlipMemoryGameHome = () => {
  const [cards, setCards] = useState([])
  const [flippedIndices, setFlippedIndices] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [flipCount, setFlipCount] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(120)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isWon, setIsWon] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  
  // Enhanced stats tracking
  const [gameStats, setGameStats] = useState({
    bestFlipCount: null,
    bestTime: null,
    highestScore: 0,
    gamesPlayed: 0,
    gamesWon: 0,
    totalFlips: 0,
    totalTimePlayed: 0,
    recentScores: [] // Store last 5 scores
  })
  
  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = getFromLocalStorage('cardFlipMemoryGame', {
      bestFlipCount: null,
      bestTime: null,
      highestScore: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      totalFlips: 0,
      totalTimePlayed: 0,
      recentScores: []
    })
    
    setGameStats(savedData)
  }, [])

  useEffect(() => {
    const shuffledCards = shuffleArray([...duplicated])
    setCards(shuffledCards)
    setIsTimerRunning(true)
  }, [])
  
  // Log when modal state changes
  useEffect(() => {
    console.log('Stats modal state changed:', isStatsModalOpen)
  }, [isStatsModalOpen])

  useEffect(() => {
    let timer
    if (isTimerRunning && timeLeft > 0 && !isGameOver) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && !isGameOver) {
      // Game over due to time expiration
      setIsGameOver(true)
      
      // Record as a played game (loss)
      const updatedStats = {...gameStats}
      updatedStats.gamesPlayed += 1
      
      // Save updated stats
      saveToLocalStorage('cardFlipMemoryGame', updatedStats)
      setGameStats(updatedStats)
    }
    return () => clearInterval(timer)
  }, [isTimerRunning, timeLeft, isGameOver, gameStats])

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstCardId, secondCardId] = flippedIndices
      const firstCard = cards.find(card => card.id === firstCardId)
      const secondCard = cards.find(card => card.id === secondCardId)

      if (firstCard && secondCard && firstCard.name === secondCard.name) {
        // It's a match
        setMatchedCards(prev => [...prev, firstCardId, secondCardId])
        setScore(prev => prev + 1)
        // Clear flipped indices immediately for matched cards
        setFlippedIndices([])
      } else {
        // Not a match - wait a moment before flipping back
        setTimeout(() => {
          setFlippedIndices([])
        }, 1000)
      }
      setFlipCount(prev => prev + 1)
    }
  }, [flippedIndices, cards])

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0 && !isGameOver) {
      setIsGameOver(true)
      setIsWon(true)
      setIsTimerRunning(false)
      
      // Calculate game statistics
      const timeSpent = 120 - timeLeft
      const currentScore = calculateScore(timeSpent, flipCount)
      setScore(currentScore)
      
      // Get existing stats
      const updatedStats = {...gameStats}
      
      // Update games played counter
      updatedStats.gamesPlayed += 1
      
      // Update win statistics
      updatedStats.gamesWon += 1
      updatedStats.totalFlips += flipCount
      updatedStats.totalTimePlayed += timeSpent
      
      // Update best flip count if current is better or if there's no previous best
      if (updatedStats.bestFlipCount === null || flipCount < updatedStats.bestFlipCount) {
        updatedStats.bestFlipCount = flipCount
      }
      
      // Update best time if current is better or if there's no previous best
      if (updatedStats.bestTime === null || timeSpent < updatedStats.bestTime) {
        updatedStats.bestTime = timeSpent
      }
      
      // Update highest score if current is better
      if (currentScore > updatedStats.highestScore) {
        updatedStats.highestScore = currentScore
      }
      
      // Add current score to recent scores (keep only last 5)
      updatedStats.recentScores = [
        {
          score: currentScore,
          flipCount,
          timeSpent,
          date: new Date().toISOString()
        },
        ...updatedStats.recentScores
      ].slice(0, 5)
      
      // Save updated stats
      saveToLocalStorage('cardFlipMemoryGame', updatedStats)
      
      // Update state
      setGameStats(updatedStats)
    }
  }, [matchedCards, cards.length, flipCount, timeLeft, gameStats, isGameOver])

  const openRulesModal = () => {
    setIsRulesModalOpen(true)
  }

  const closeRulesModal = () => {
    setIsRulesModalOpen(false)
  }

  const handleCardClick = cardId => {
    if (
      isGameOver ||
      flippedIndices.includes(cardId) ||
      matchedCards.includes(cardId) ||
      flippedIndices.length >= 2
    ) {
      return
    }
    setFlippedIndices(prev => [...prev, cardId])
  }

  const resetGame = () => {
    // If the game was over but not won, record it as a loss
    if (isGameOver && !isWon) {
      const updatedStats = {...gameStats}
      updatedStats.gamesPlayed += 1
      
      // Save updated stats
      saveToLocalStorage('cardFlipMemoryGame', updatedStats)
      setGameStats(updatedStats)
    }
    
    // Reset game state
    const shuffledCards = shuffleArray([...duplicated])
    setCards(shuffledCards)
    setFlippedIndices([])
    setMatchedCards([])
    setFlipCount(0)
    setScore(0)
    setTimeLeft(120)
    setIsGameOver(false)
    setIsWon(false)
    setIsTimerRunning(true)
  }

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0')
    const secs = (seconds % 60).toString().padStart(2, '0')
    return `${mins}:${secs}`
  }

  // Function to open stats modal
  const openStatsModal = () => {
    console.log('Opening stats modal');
    setIsStatsModalOpen(true);
  };

  // Function to close stats modal
  const closeStatsModal = () => {
    console.log('Closing stats modal');
    setIsStatsModalOpen(false);
  };

  if (isGameOver) {
    const timeSpent = 120 - timeLeft
    const currentScore = isWon ? score : 0
    
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
        
        {isWon && (
          <div className="game-score-display">
            <h3>Your Score: {currentScore}</h3>
            <div className="score-breakdown">
              <p>Flips: {flipCount}</p>
              <p>Time: {formatTime(timeSpent)}</p>
            </div>
          </div>
        )}
        
        {isWon && (
          <div className="stats-container">
            <h3>Your Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Best Score:</span>
                <span className="stat-value">{gameStats.highestScore}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Best Flips:</span>
                <span className="stat-value">{gameStats.bestFlipCount || '-'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Best Time:</span>
                <span className="stat-value">{gameStats.bestTime ? formatTime(gameStats.bestTime) : '-'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Games Won:</span>
                <span className="stat-value">{gameStats.gamesWon}</span>
              </div>
            </div>
            
            <button 
              type="button" 
              onClick={openStatsModal} 
              className="view-stats-button"
            >
              View Detailed Stats
            </button>
          </div>
        )}
        
        <div className="game-actions">
          <button onClick={resetGame} className="play-again-button">Play Again</button>
        </div>
        
        {/* Stats Modal */}
        <Modal
          isOpen={isStatsModalOpen}
          onRequestClose={closeStatsModal}
          contentLabel="Game Statistics"
          className="modal-content stats-modal-content"
          overlayClassName="modal-overlay"
          ariaHideApp={false}
        >
          <div className="modal-header">
            <h2>Game Statistics</h2>
            <button
              type="button"
              onClick={closeStatsModal}
              className="close-button"
              aria-label="Close statistics"
            >
              <CgClose />
            </button>
          </div>
          
          <div className="stats-modal-body">
            <div className="stats-section">
              <h3>Overall Performance</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Games Played:</span>
                  <span className="stat-value">{gameStats.gamesPlayed}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Games Won:</span>
                  <span className="stat-value">{gameStats.gamesWon}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Win Rate:</span>
                  <span className="stat-value">
                    {gameStats.gamesPlayed > 0 
                      ? `${Math.round((gameStats.gamesWon / gameStats.gamesPlayed) * 100)}%` 
                      : '0%'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="stats-section">
              <h3>Best Performances</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Highest Score:</span>
                  <span className="stat-value">{gameStats.highestScore}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Best Flip Count:</span>
                  <span className="stat-value">{gameStats.bestFlipCount || '-'}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Best Time:</span>
                  <span className="stat-value">{gameStats.bestTime ? formatTime(gameStats.bestTime) : '-'}</span>
                </div>
              </div>
            </div>
            
            <div className="stats-section">
              <h3>Averages</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span className="stat-label">Avg. Flips:</span>
                  <span className="stat-value">
                    {gameStats.gamesWon > 0 
                      ? Math.round(gameStats.totalFlips / gameStats.gamesWon) 
                      : '-'}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Avg. Time:</span>
                  <span className="stat-value">
                    {gameStats.gamesWon > 0 
                      ? formatTime(Math.round(gameStats.totalTimePlayed / gameStats.gamesWon)) 
                      : '-'}
                  </span>
                </div>
              </div>
            </div>
            
            {gameStats.recentScores.length > 0 && (
              <div className="stats-section">
                <h3>Recent Games</h3>
                <table className="recent-scores-table">
                  <thead>
                    <tr>
                      <th>Score</th>
                      <th>Flips</th>
                      <th>Time</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gameStats.recentScores.map((game, index) => (
                      <tr key={index}>
                        <td>{game.score}</td>
                        <td>{game.flipCount}</td>
                        <td>{formatTime(game.timeSpent)}</td>
                        <td>{new Date(game.date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Modal>
      </div>
    )
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <Link to="/card-flip-memory-game">
          <BiArrowBack /> Back to Rules
        </Link>
          <button type="button" onClick={openRulesModal}>
            Rules
          </button>
      </div>

      {/* Rules Modal */}
      <Modal
        isOpen={isRulesModalOpen}
        onRequestClose={closeRulesModal}
        contentLabel="Game Rules"
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
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
            When the game is started, the users should be able to see the list
            of Cards that are shuffled and turned face down.
          </li>
          <li>
            When a user starts the game, the user should be able to see the
            Timer running.
          </li>
          <li>The Timer starts from 2 Minutes.</li>
          <li>
            If the two cards have the same image, they remain face up. If not,
            they should be flipped face down again after a short 2 seconds.
          </li>
          <li>Users should be able to compare only two cards at a time.</li>
          <li>
            When the user is not able to find all the cards before the timer
            ends the game should end and redirect to the Time Up Page.
          </li>
          <li>
            If the user finds all the matching cards before the timer ends, then
            the user should be redirected to the results page.
          </li>
          </ul>

          <h3>Card List:</h3>
          <ul className="cards-list-in-modal">
            {cardsData.map(card => (
              <li key={card.id}>
                <img src={card.image} alt={card.name} />
                <span>{card.name}</span>
              </li>
            ))}
            {cardsData.map(card => (
              <li key={`duplicate-${card.id}`}>
                <img src={card.image} alt={card.name} />
                <span>{card.name} (duplicate)</span>
              </li>
            ))}
          </ul>
        </div>
      </Modal>

      <h1 className="card-flip-title">Card-Flip Memory Game</h1>

      <div className="timer-score-count">
        <div className="game-stat">
          <span className="stat-label">Flips</span>
          <span className="stat-value">{flipCount}</span>
        </div>
        <div className="game-stat">
          <span className="stat-label">Time Left</span>
          <span className="stat-value">{formatTime(timeLeft)}</span>
        </div>
        <div className="game-stat">
          <span className="stat-label">Score</span>
          <span className="stat-value">{score}</span>
        </div>
        <div className="game-stat">
          <span className="stat-label">Best Score</span>
          <span className="stat-value">{gameStats.highestScore}</span>
        </div>
      </div>

      <ul className="cards-list">
        {cards.map(card => (
          <li key={card.id}>
            <button
              data-testid={card.name}
              onClick={() => handleCardClick(card.id)}
              disabled={
                flippedIndices.length >= 2 ||
                matchedCards.includes(card.id) ||
                isGameOver
              }
              className={
                // Simplified class logic to avoid animation persistence issues
                matchedCards.includes(card.id)
                  ? 'permanently-matched-card' // Always use this for matched cards
                  : flippedIndices.includes(card.id)
                  ? 'flipped-card' // Simple class for flipped cards
                  : ''
              }
            >
              {flippedIndices.includes(card.id) || matchedCards.includes(card.id) ? (
                <img src={card.src} alt={card.name} />
              ) : (
                '❓'
              )}
            </button>
          </li>
        ))}
      </ul>

      <div className="stats-button-container">
        <button 
          type="button" 
          onClick={openStatsModal} 
          className="stats-button"
          style={{
            backgroundColor: '#2196f3',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            fontWeight: 'bold',
            marginTop: '15px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
          }}
        >
          View Stats
        </button>
      </div>
      
      {/* Stats Modal for main game view */}
      <Modal
        isOpen={isStatsModalOpen}
        onRequestClose={closeStatsModal}
        contentLabel="Game Statistics"
        className="modal-content stats-modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          },
          content: {
            position: 'relative',
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
            maxWidth: '700px',
            width: '90%',
            padding: '25px',
            borderRadius: '10px',
            background: 'white',
            maxHeight: '80vh',
            overflow: 'auto'
          }
        }}
      >
        <div className="modal-header">
          <h2>Game Statistics</h2>
          <button
            type="button"
            onClick={closeStatsModal}
            className="close-button"
            aria-label="Close statistics"
          >
            <CgClose />
          </button>
        </div>
        
        <div className="stats-modal-body">
          <div className="stats-section">
            <h3>Overall Performance</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Games Played:</span>
                <span className="stat-value">{gameStats.gamesPlayed}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Games Won:</span>
                <span className="stat-value">{gameStats.gamesWon}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Win Rate:</span>
                <span className="stat-value">
                  {gameStats.gamesPlayed > 0 
                    ? `${Math.round((gameStats.gamesWon / gameStats.gamesPlayed) * 100)}%` 
                    : '0%'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="stats-section">
            <h3>Best Performances</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Highest Score:</span>
                <span className="stat-value">{gameStats.highestScore}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Best Flip Count:</span>
                <span className="stat-value">{gameStats.bestFlipCount || '-'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Best Time:</span>
                <span className="stat-value">{gameStats.bestTime ? formatTime(gameStats.bestTime) : '-'}</span>
              </div>
            </div>
          </div>
          
          <div className="stats-section">
            <h3>Averages</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Avg. Flips:</span>
                <span className="stat-value">
                  {gameStats.gamesWon > 0 
                    ? Math.round(gameStats.totalFlips / gameStats.gamesWon) 
                    : '-'}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Avg. Time:</span>
                <span className="stat-value">
                  {gameStats.gamesWon > 0 
                    ? formatTime(Math.round(gameStats.totalTimePlayed / gameStats.gamesWon)) 
                    : '-'}
                </span>
              </div>
            </div>
          </div>
          
          {gameStats.recentScores.length > 0 && (
            <div className="stats-section">
              <h3>Recent Games</h3>
              <table className="recent-scores-table">
                <thead>
                  <tr>
                    <th>Score</th>
                    <th>Flips</th>
                    <th>Time</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {gameStats.recentScores.map((game, index) => (
                    <tr key={index}>
                      <td>{game.score}</td>
                      <td>{game.flipCount}</td>
                      <td>{formatTime(game.timeSpent)}</td>
                      <td>{new Date(game.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default CardFlipMemoryGameHome