import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'
import Modal from 'react-modal'
import {Line} from 'rc-progress'
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage'

import './index.css'

const emojiMap = [
  {id: 0, name: 'neutral face'},
  {id: 1, name: 'grimacing face'},
  {id: 5, name: 'slightly smiling face'},
  {id: 10, name: 'grinning face with big eyes'},
  {id: 11, name: 'grinning face with smiling eyes'},
  {id: 12, name: 'beaming face with smiling eyes'},
  {id: 13, name: 'grinning face'},
  {id: 14, name: 'smiling face with sunglasses'},
]

const MemoryMatrixGame = () => {
  const [view, setView] = useState('game')
  const [level, setLevel] = useState(1)
  const [grid, setGrid] = useState([])
  const [highlightedCells, setHighlightedCells] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [resultMessage, setResultMessage] = useState('')
  const [progress, setProgress] = useState(0)
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false)
  const [noClickTimeout, setNoClickTimeout] = useState(null)
  const [highestLevel, setHighestLevel] = useState(0)
  const [bestProgress, setBestProgress] = useState(0)
  
  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = getFromLocalStorage('memoryMatrix', {
      highestLevel: 0,
      bestProgress: 0
    })
    
    setHighestLevel(savedData.highestLevel)
    setBestProgress(savedData.bestProgress)
  }, [])

  const N = Math.min(3 + level - 1, 6)

  const shuffle = array => [...array].sort(() => Math.random() - 0.5)

  const handleLoss = () => {
    const percentage = Math.floor(((level - 1) / 15) * 100)
    setProgress(percentage)
    setResultMessage(`You have reached level ${level - 1}`)
    setView('results')
    if (noClickTimeout) clearTimeout(noClickTimeout)
    
    // Save highest level and best progress to localStorage
    const currentLevel = level - 1
    const savedData = getFromLocalStorage('memoryMatrix', {
      highestLevel: 0,
      bestProgress: 0
    })
    
    // Update highest level if current is better
    const newHighestLevel = Math.max(currentLevel, savedData.highestLevel)
    // Update best progress if current is better
    const newBestProgress = Math.max(percentage, savedData.bestProgress)
    
    // Save updated stats
    saveToLocalStorage('memoryMatrix', {
      highestLevel: newHighestLevel,
      bestProgress: newBestProgress
    })
    
    // Update state
    setHighestLevel(newHighestLevel)
    setBestProgress(newBestProgress)
  }

  const startLevel = () => {
    const cells = Array.from({length: N * N}, (_, index) => index)
    const highlights = shuffle(cells).slice(0, N)
    setGrid(cells)
    setHighlightedCells(highlights)
    setDisabled(true)
    setTimeout(() => setDisabled(false), N * 1000)
    // no-click timeout
    setTimeout(() => {
      if (highlightedCells.length === 0) return
      if (noClickTimeout) clearTimeout(noClickTimeout)
      const timeout = setTimeout(
        () => {
          setResultMessage('Congratulations')
          setProgress(Math.floor(((level - 1) / 15) * 100))
          setView('results')
        },
        (N + 3) * 1000,
      )
      setNoClickTimeout(timeout)
    }, N * 1000)
  }

  useEffect(() => {
    return () => {
      if (noClickTimeout) clearTimeout(noClickTimeout)
    }
  }, [noClickTimeout])

  useEffect(() => {
    if (view === 'game') startLevel()
  }, [view, level])

  const handleCellClick = i => {
    if (disabled) return
    if (!highlightedCells.includes(i)) {
      handleLoss()
    } else {
      const rem = highlightedCells.filter(idx => idx !== i)
      setHighlightedCells(rem)
      if (rem.length === 0) {
        if (noClickTimeout) clearTimeout(noClickTimeout)
        if (level === 15) {
          setResultMessage('You have reached level 15')
          setProgress(100)
          setView('results')
        } else setLevel(l => l + 1)
      }
    }
  }

  const restart = () => {
    setLevel(1)
    setProgress(0)
    setResultMessage('')
    setView('game')
  }

  return (
    <div className="memory-matrix-container" data-testid="memoryMatrixGame">
      <div className="game-header">
        <Link to="/memory-matrix" data-testid="backButton">
          <BiArrowBack /> Back to Rules
        </Link>
        <button 
          type="button" 
          onClick={() => setIsRulesModalOpen(true)}
          data-testid="headerRulesButton"
        >
          Rules
        </button>
      </div>

      <Modal
        isOpen={isRulesModalOpen}
        onRequestClose={() => setIsRulesModalOpen(false)}
        contentLabel="Game Rules"
        className="modal-content"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
        data-testid="rulesModal"
      >
        <div className="modal-header">
          <h2 data-testid="modalTitle">Rules</h2>
          <button
            type="button"
            onClick={() => setIsRulesModalOpen(false)}
            className="close-button"
            data-testid="closeButton"
            aria-label="Close rules"
          >
            <CgClose data-testid="closeIcon" />
          </button>
        </div>
        <div className="rules-content">
          <ul className="rules-list" data-testid="rulesList">
            <li>In each level, memorize the highlighted tiles.</li>
            <li>Tiles highlight for N seconds, then clear.</li>
            <li>Click only the tiles that were highlighted.</li>
            <li>Clicking a wrong tile ends the game.</li>
            <li>With each level, grid size and highlights increase.</li>
            <li>Complete all 15 levels to finish.</li>
            <li>Your progress is shown in the bar below.</li>
          </ul>
          
          <h3>Level Progression:</h3>
          <p>As you progress through levels, the grid size and number of tiles to remember will increase:</p>
          <ul>
            <li>Levels 1-3: 3x3 grid</li>
            <li>Levels 4-6: 4x4 grid</li>
            <li>Levels 7-9: 5x5 grid</li>
            <li>Levels 10-15: 6x6 grid</li>
          </ul>
          
          <h3>Grid Preview:</h3>
          <ul className="grid-preview" data-testid="gridExample">
            {Array.from({length: 16}).map((_, idx) => (
              <li key={idx} data-testid={`gridCell${idx}`}>
                {idx < 4 ? <div className="highlighted-preview-cell"></div> : <div className="normal-preview-cell"></div>}
              </li>
            ))}
          </ul>
          
          <div className="emoji-container">
            {emojiMap.slice(0, 5).map(emoji => (
              <img
                key={emoji.id}
                src={`https://emojiapi.dev/api/v1/${emoji.name.replace(
                  / /g,
                  '_',
                )}/128.png`}
                alt={emoji.name}
                width="40"
              />
            ))}
          </div>
        </div>
      </Modal>

      {view === 'game' && (
        <div className="game-playing-view" data-testid="gamePlayingView">
          <h1 data-testid="gameTitle">Memory Matrix</h1>
          <p data-testid="levelText">Level - {level}</p>
          <ul className="grid" data-testid="gameGrid">
            {grid.map(i => (
              <li key={i}>
                <button
                  data-testid={
                    highlightedCells.includes(i)
                      ? 'highlighted'
                      : 'notHighlighted'
                  }
                  disabled={disabled}
                  className={
                    disabled && highlightedCells.includes(i)
                      ? 'highlighted-cell'
                      : 'normal-cell'
                  }
                  onClick={() => handleCellClick(i)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === 'results' && (
        <div className="results-view" data-testid="resultsView">
          <h1 data-testid="resultMessage">{resultMessage}</h1>
          <Line
            percent={progress}
            strokeWidth={4}
            strokeColor="#4caf50"
            data-testid="progressBar"
          />
          <p data-testid="levelDisplay">Level {level > 15 ? 15 : level - 1}</p>
          
          <div className="stats-container">
            <p>Highest Level: {highestLevel}</p>
            <Line
              percent={bestProgress}
              strokeWidth={4}
              strokeColor="#2196f3"
              data-testid="bestProgressBar"
            />
            <p>Best Progress: {bestProgress}%</p>
          </div>
          
          <div className="emoji-container" data-testid="emojiContainer">
            {emojiMap.map(emoji => (
              <img
                key={emoji.id}
                src={`https://emojiapi.dev/api/v1/${emoji.name.replace(
                  / /g,
                  '_',
                )}/128.png`}
                alt={emoji.name}
                width="40"
                data-testid={emoji.name.replace(/ /g, '-')}
              />
            ))}
          </div>
          <button
            onClick={restart}
            className="play-again-button"
            data-testid="playAgainButton"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}

export default MemoryMatrixGame
