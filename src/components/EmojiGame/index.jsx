import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import '../../GameRulesView.css'

const EmojiGame = () => (
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
          src="https://res.cloudinary.com/dgsmgz8zl/image/upload/v1742966834/Emoji-Logo_aluka5.png"
          alt="emoji game"
        />
        <h1>Emoji Game</h1>
      </div>
      <div className="game-rules">
        <h1>Rules</h1>
        <ul className="rules-list">
          <li>User should be able to see the list of Emojis.</li>
          <li>
            When the user clicks any one of the Emoji for the first time, then
            the count of the score should be incremented by 1 and the List of
            emoji cards should be shuffled.
          </li>
          <li>
            This process should be repeated every time the user clicks on a
            emoji card.
          </li>
          <li>
            When the user clicks on all Emoji cards without clicking any of it
            twice, then the user will win the game.
          </li>
          <li>
            When the user clicks on the same Emoji for the second time, then the
            user will lose the game.
          </li>
          <li>
            Once the game is over, the user will be redirected to the results
            page.
          </li>
        </ul>

        <Link to="/emoji-game-home" className="link">
          <button type="button" className="start-playing">
            Start playing
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default EmojiGame
