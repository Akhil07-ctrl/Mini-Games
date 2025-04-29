import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import '../../GameRulesView.css'

const CardFlipMemoryGame = () => (
  <div className="game-rules-view">
    <Link to="/" className="link">
      <div className="game-header">
        <button type="button">
          <BiArrowBack /> Back
        </button>
      </div>
    </Link>

    <div className="game-content">
      <div className="game-info">
        <img
          src="https://res.cloudinary.com/dgsmgz8zl/image/upload/v1742966834/Flip-Card-Logo_rzygvw.png"
          alt="card flip memory game"
        />
        <h1>Card-Flip Memory Game</h1>
      </div>
      <div className="game-rules">
        <h1>Rules</h1>
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

        <Link to="/card-flip-memory-game-home" className="link">
          <button type="button" className="start-playing">
            Start playing
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default CardFlipMemoryGame
