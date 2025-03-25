import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {FaLinkedin, FaGithub, FaClock} from 'react-icons/fa'
import './index.css'

const miniGames = [
  {id: 'emojiGame', name: 'Emoji Game', path: 'emoji-game-home', imageUrl: "Emoji-Logo.png"},
  {
    id: 'rockPaperScissors',
    name: 'Rock Paper Scissors',
    path: 'rock-paper-scissors-home', imageUrl: "RPS-Logo.png"
  },
  {id: 'matchGame', name: 'Match Game', path: 'match-game-home', imageUrl: "Match-Game-Logo.png"},
  {id: 'flipCard', name: 'Flip Card', path: 'flip-card-home', imageUrl: "Flip-Card-Logo.png"},
]

// Clock component to display current time
const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="clock">
      <FaClock style={{marginRight: '0.5rem'}} />
      {currentTime.toLocaleTimeString()}
    </div>
  )
}

// Footer component with love symbol and react-icons LinkedIn icon
const Footer = () => (
  <footer className="footer">
    <p>
      Made with <span className="love">❤️</span> from Kundena Akhil
      <a
        href="https://www.linkedin.com/in/kundena-akhil-4b7073170/"
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin-icon"
      >
        <FaLinkedin size={16} />
      </a>
      <a
        href="https://github.com/Akhil07-ctrl"
        target="_blank"
        rel="noopener noreferrer"
        className="github-icon"
      >
        <FaGithub size={16} />
      </a>
    </p>
    <div>
      <p>&copy; {new Date().getFullYear()} Mini Games, Inc.</p>
    </div>
    <div>
      <p>All Rights Reserved.</p>
    </div>
  </footer>
)

const Home = () => (
  <div className="main-container">
    {/* Clock at top right */}
    <Clock />

    {/* Greeting message */}
    <header className="greeting">
      <h2>Hello, welcome to Mini Games!</h2>
    </header>

    <div className="home-container">
      <h1 className="title">Mini Games</h1>
      <ul className="games-list">
        {miniGames.map(each => (
          <li key={each.id} className="game-item">
            <Link to={`/${each.path}`} className="game-link">
            <img src={each.imageUrl} alt="image" className='game-logo' />
              {each.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <Footer />
  </div>
)

export default Home
