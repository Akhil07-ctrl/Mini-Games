import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import {Line} from 'rc-progress'
import './index.css' // Create styling accordingly

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
  const [view, setView] = useState('rules') // 'rules' | 'game' | 'results'
  const [level, setLevel] = useState(1)
  const [grid, setGrid] = useState([])
  const [highlightedCells, setHighlightedCells] = useState([])
  const [selectedCells, setSelectedCells] = useState([])
  const [disabled, setDisabled] = useState(true)
  const [resultMessage, setResultMessage] = useState('')
  const [progress, setProgress] = useState(0)

  const N = Math.min(3 + level - 1, 6)

  // Define functions before they're used
  const shuffle = array => [...array].sort(() => Math.random() - 0.5)

  const handleLoss = () => {
    const percentage = Math.floor(((level - 1) / 15) * 100)
    setProgress(percentage)
    setResultMessage(`You have reached level ${level - 1}`)
    setView('results')
  }

  const startLevel = () => {
    const cells = Array.from({length: N * N}, (_, index) => index)
    const highlights = shuffle(cells).slice(0, N)
    setGrid(cells)
    setHighlightedCells(highlights)
    setSelectedCells([])
    setDisabled(true)
    setTimeout(() => setDisabled(false), N * 1000)
  }

  useEffect(() => {
    if (view === 'game') {
      startLevel()
    }
  }, [level, view])

  const handleCellClick = index => {
    if (disabled) return
    if (highlightedCells.includes(index)) {
      if (!selectedCells.includes(index)) {
        const newSelected = [...selectedCells, index]
        setSelectedCells(newSelected)
        if (newSelected.length === highlightedCells.length) {
          if (level === 15) {
            setResultMessage('You have reached level 15')
            setProgress(100)
            setView('results')
          } else {
            setLevel(prev => prev + 1)
          }
        }
      }
    } else {
      handleLoss()
    }
  }

  const handleNoClickTimeout = () => {
    setTimeout(
      () => {
        if (selectedCells.length === 0) {
          setResultMessage('Congratulations')
          setProgress(Math.floor(((level - 1) / 15) * 100))
          setView('results')
        }
      },
      (N + 3) * 1000,
    )
  }

  const renderRulesView = () => (
    <div className="rules-view">
      <img
        src="https://cdn-icons-png.flaticon.com/512/991/991931.png"
        alt="card flip memory game"
        width="150"
      />
      <h2>Memory Matrix Game Rules</h2>
      <ul>
        <li>Remember the highlighted tiles.</li>
        <li>After a few seconds, select them in order.</li>
        <li>Don't click on unhighlighted tiles!</li>
        <li>Levels get harder as you go.</li>
        <li>You can only play up to level 15.</li>
        <li>Good luck! :) </li>
      </ul>
      <button
        onClick={() => {
          setView('game')
          handleNoClickTimeout()
        }}
      >
        Start Playing
      </button>
    </div>
  )

  const renderGameView = () => (
    <div className="game-playing-view">
      <h1>Memory Matrix</h1>
      <p>Level - {level}</p>
      <ul className="grid">
        {grid.map((cell, idx) => (
          <li key={cell}>
            <button
              data-testid={
                highlightedCells.includes(idx)
                  ? 'highlighted'
                  : 'notHighlighted'
              }
              disabled={disabled}
              className={
                disabled && highlightedCells.includes(idx)
                  ? 'highlighted-cell'
                  : 'normal-cell'
              }
              onClick={() => handleCellClick(idx)}
            />
          </li>
        ))}
      </ul>
    </div>
  )

  const renderResultsView = () => (
    <div className="results-view">
      <h1>{resultMessage}</h1>
      <Line percent={progress} strokeWidth={4} strokeColor="#4caf50" />
      <p>Level {level > 15 ? 15 : level - 1}</p>
      <div className="emoji-container">
        {emojiMap.map(emoji =>
          level - 1 >= emoji.id ? (
            <img
              key={emoji.id}
              src={`https://emojiapi.dev/api/v1/${emoji.name.replace(
                / /g,
                '_',
              )}/128.png`}
              alt={emoji.name}
              width="40"
            />
          ) : null,
        )}
      </div>
      <button
        onClick={() => {
          setLevel(1)
          setView('game')
        }}
      >
        Play Again
      </button>
    </div>
  )

  return (
    <div className="memory-matrix-container">

      <div className="game-header">
        <Link to="/memory-matrix">
            <BiArrowBack /> Back to Rules
        </Link>
        <button type="button" onClick={() => alert('Rules Coming Soon...')}>
            Rules
        </button>
      </div>

      {view === 'rules' && renderRulesView()}
      {view === 'game' && renderGameView()}
      {view === 'results' && renderResultsView()}
      
    </div>
  )
}

export default MemoryMatrixGame
