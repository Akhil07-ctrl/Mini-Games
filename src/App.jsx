import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import EmojiGame from './components/EmojiGame'
import RockPaperScissor from './components/RockPaperScissor'
import CardFlipMemoryGame from './components/CardFlipMemoryGame'
import CardFlipMemoryGameHome from './components/CardFlipMemoryGameHome'
import MemoryMatrix from './components/MemoryMatrix'
import EmojiGameHome from './components/EmojiGameHome'
import RockPaperScissorHome from './components/RockPaperScissorHome'
import MemoryMatrixHome from './components/MemoryMatrixHome'

import './App.css'

const App = () => (
  <Router basename='/Mini-Games'>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/emoji-game" element={<EmojiGame />} />
      <Route path="/rock-paper-scissor" element={<RockPaperScissor />} />
      <Route path="/card-flip-memory-game" element={<CardFlipMemoryGame />} />
      <Route path="/card-flip-memory-game-home" element={<CardFlipMemoryGameHome />} />
      <Route path="/memory-matrix" element={<MemoryMatrix />} />
      <Route path="/emoji-game-home" element={<EmojiGameHome />} />
      <Route path="/rock-paper-scissor-home" element={<RockPaperScissorHome />} />   
      <Route path="/memory-matrix-home" element={<MemoryMatrixHome />} />
    </Routes>
  </Router>
)

export default App
