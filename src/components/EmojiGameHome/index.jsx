import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from "react-icons/cg"
import Modal from "react-modal"
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage'

import './index.css'

Modal.setAppElement('#root')

const emojisList = [
  {
    id: 0,
    emojiName: 'Face with stuck out tongue',
    alt: 'face with stuck out tongue',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-img.png',
  },
  {
    id: 1,
    emojiName: 'Face with head bandage',
    alt: 'face with head bandage',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-head-bandage-img.png',
  },
  {
    id: 2,
    emojiName: 'Face with hugs',
    alt: 'face with hugs',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-hugs-img.png',
  },
  {
    id: 3,
    emojiName: 'Face with laughing',
    alt: 'face with laughing',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-img.png',
  },
  {
    id: 4,
    emojiName: 'Laughing face with hand in front of mouth',
    alt: 'laughing face with hand in front of mouth',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-with-hand-infront-mouth-img.png',
  },
  {
    id: 5,
    emojiName: 'Face with mask',
    alt: 'face with mask',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-mask-img.png',
  },
  {
    id: 6,
    emojiName: 'Face with silence',
    alt: 'face with silence',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-silence-img.png',
  },
  {
    id: 7,
    emojiName: 'Face with stuck out tongue and winked eye',
    alt: 'face with stuck out tongue and winked eye',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-and-winking-eye-img.png',
  },
  {
    id: 8,
    emojiName: 'Grinning face with sweat',
    alt: 'grinning face with sweat',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/grinning-face-with-sweat-img.png',
  },
  {
    id: 9,
    emojiName: 'Smiling face with heart eyes',
    alt: 'smiling face with heart eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-heart-eyes-img.png',
  },
  {
    id: 10,
    emojiName: 'Grinning face',
    alt: 'grinning face',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/grinning-face-img.png',
  },
  {
    id: 11,
    emojiName: 'Smiling face with star eyes',
    alt: 'smiling face with star eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-star-eyes-img.png',
  },
]

// Shuffle function to randomize emoji order
const shuffleEmojis = array => {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}

const EmojiGameHome = () => {
  const [score, setScore] = useState(0)
  const [topScore, setTopScore] = useState(0)
  const [clickedEmojis, setClickedEmojis] = useState([])
  const [currentEmojis, setCurrentEmojis] = useState(emojisList)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false)
  const [shuffleKey, setShuffleKey] = useState(0);

  // Load saved data and shuffle emojis on component mount
  useEffect(() => {
    // Load top score from localStorage
    const savedData = getFromLocalStorage('emojiGame', {
      topScore: 0
    })
    
    setTopScore(savedData.topScore)
    setCurrentEmojis(shuffleEmojis(emojisList))
  }, [])

  const handleEmojiClick = id => {
    // If the game is over, don't process clicks
    if (gameOver) return

    // Check if emoji was already clicked
    if (clickedEmojis.includes(id)) {
      // Game over - user clicked the same emoji twice
      setGameOver(true)

      // Update top score if current score is higher
      if (score > topScore) {
        setTopScore(score)
        // Save to localStorage
        saveToLocalStorage('emojiGame', {
          topScore: score
        })
      }
    } else {
      // Add emoji to clicked list
      const newClickedEmojis = [...clickedEmojis, id]
      setClickedEmojis(newClickedEmojis)

      // Increment score
      const newScore = score + 1
      setScore(newScore)

      // Force DOM update by changing key
      setShuffleKey(prev => prev + 1);
      // Shuffle emojis for next round
      setCurrentEmojis(shuffleEmojis(emojisList))

      // Check if all emojis have been clicked (game won)
      if (newClickedEmojis.length === emojisList.length) {
        setGameWon(true)
        setGameOver(true)
        setTopScore(emojisList.length)
        // Save perfect score to localStorage
        saveToLocalStorage('emojiGame', {
          topScore: emojisList.length
        })
      }
    }
  }

  const resetGame = () => {
    setScore(0)
    setClickedEmojis([])
    setShuffleKey(prev => prev + 1); // Reset animations
    setCurrentEmojis(shuffleEmojis(emojisList))
    setGameOver(false)
    setGameWon(false)
  }
  
  const openRulesModal = () => {
    setIsRulesModalOpen(true)
  }

  const closeRulesModal = () => {
    setIsRulesModalOpen(false)
  }

  const resultImage = gameWon ? (
    <img
      src="https://assets.ccbp.in/frontend/react-js/won-game-img.png"
      alt="won"
    />
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/lose-game-img.png"
      alt="lose"
    />
  )

  return (
    <div className="emoji-game-container">
      <div className="emoji-content">
        <div className="game-header">
          <Link to="/emoji-game">
            <BiArrowBack /> Back to Rules
          </Link>
          <button type="button" onClick={openRulesModal}>
            Rules
          </button>
        </div>
        
        <nav>
          <div className="emoji-title-logo">
            <img
              src="https://res.cloudinary.com/dgsmgz8zl/image/upload/v1745665695/wink_1_nlj8rk.png"
              alt="emoji logo"
            />
            <h1>Emoji Game</h1>
          </div>
          <div className="emoji-score">
            <p>Score: {score}</p>
            <p>Top Score: {topScore}</p>
          </div>
        </nav>

        <div>
          
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
                  Try to click on each emoji only once.
                </li>
                <li>
                  If you click on the same emoji twice, you lose the game.
                </li>
                <li>
                  After each click, the emojis will be shuffled.
                </li>
                <li>
                  Your score increases by 1 for each unique emoji you click.
                </li>
                <li>
                  Your top score is the highest score you've achieved so far.
                </li>
                <li>
                  If you click on all 12 emojis without repeating, you win!
                </li>
              </ul>

              <h3>Emoji List:</h3>
              <ul className="cards-list-in-modal">
                {emojisList.map(emoji => (
                  <li key={emoji.id}>
                    <img src={emoji.emojiUrl} alt={emoji.alt} />
                    <span>{emoji.emojiName}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Modal>

          {gameOver ? (
            <div className="win-lose-card">
              <div className="left-content">
                <h1 className="lose-win-heading">
                  {gameWon ? 'You Won' : 'You Lose'}
                </h1>
                <div className="best-score">
                  <p>{gameWon ? 'Best Score' : 'Score'}</p>
                  <p className="emoji-win-lose-score">{score}/12</p>
                </div>
                <button
                  type="button"
                  onClick={resetGame}
                  className="play-again"
                >
                  Play Again
                </button>
              </div>
              {resultImage}
            </div>
          ) : (
            <div className="emoji-list-container">
              <ul className="emoji-list" key={shuffleKey}>
                {currentEmojis.map(emoji => (
                  <li key={emoji.id}>
                    <button
                      type="button"
                      className={`emoji-button ${clickedEmojis.includes(emoji.id) ? 'clicked' : ''}`}
                      onClick={() => handleEmojiClick(emoji.id)}
                      aria-label={emoji.emojiName}
                    >
                      <img
                        src={emoji.emojiUrl}
                        alt={emoji.alt}
                        className="emoji-img"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmojiGameHome
