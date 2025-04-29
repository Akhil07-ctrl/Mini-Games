
import {Link} from 'react-router-dom'
import {FaLinkedin, FaGithub} from 'react-icons/fa'
import './index.css'

const gamesList = [
  {
    id: 0,
    name: 'Emoji Game',
    alt: 'emoji game',
    path: '/emoji-game',
    imageUrl:
      'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1742966834/Emoji-Logo_aluka5.png',
  },
  {
    id: 1,
    name: 'Memory Matrix',
    alt: 'memory matrix',
    path: '/memory-matrix',
    imageUrl:
      'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1742966837/Match-Game-Logo_nk3f2c.png',
  },
  {
    id: 2,
    name: 'Rock Paper Scissor',
    alt: 'rock paper scissor',
    path: '/rock-paper-scissor',
    imageUrl:
      'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1742966837/RPS-Logo_cibkvz.png',
  },
  {
    id: 3,
    name: 'Card-Flip Memory Game',
    alt: 'card flip memory game',
    path: '/card-flip-memory-game',
    imageUrl:
      'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1742966834/Flip-Card-Logo_rzygvw.png',
  },
]

const Home = () => (
  <div className="games-app-container">
    <header className="games-header">
      <h1 className="games-title">Mini Games Collection</h1>
      <p className="games-subtitle">Choose a game to play!</p>
    </header>

    <main className="games-main">
      <ul className="games-grid">
        {gamesList.map(game => (
          <li key={game.id} className="game-card">
            <Link to={game.path} className="game-link">
              <div className="game-image-container">
                <img
                  src={game.imageUrl}
                  alt={game.alt}
                  className="game-image"
                  loading="lazy"
                />
              </div>
              <h3 className="game-name">{game.name}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </main>

    <footer className="footer">
      <p>
        Made with <span className="love">❤️</span> by Kundena Akhil
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
  </div>
)

export default Home
