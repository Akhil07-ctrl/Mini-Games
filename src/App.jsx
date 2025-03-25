import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Home from './components/Home'
import EmojiGameHomePage from './components/EmojiGameHomePage'
import EmojiGame from './components/EmojiGame'
import FlipCard from './components/FlipCard'
import FlipCardHome from './components/FlipCardHome'
import RockPaperScissors from './components/RockPaperScissors'
import RockPaperScissorsHome from './components/RockPaperScissorsHome'
import MatchGame from './components/MatchGame'
import MatchGameHome from './components/MatchGameHome'

import './App.css'

const App = () => (
  <Router basename='/Mini-Games/'>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/emoji-game-home" element={<EmojiGameHomePage />} />
      <Route path="/emoji-game" element={<EmojiGame />} />
      <Route path="/rock-paper-scissors-home" element={<RockPaperScissors />} />
      <Route path="/rock-paper-scissors" element={<RockPaperScissorsHome />} />
      <Route path="/flip-card-home" element={<FlipCard />} />
      <Route path="/flip-card" element={<FlipCardHome />} />
      <Route path="/match-game-home" element={<MatchGame />} />
      <Route path="/match-game" element={<MatchGameHome />} />
    </Routes>
  </Router>
)

export default App
