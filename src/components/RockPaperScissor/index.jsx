import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import '../../GameRulesView.css'

const RockPaperScissor = () => (
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
          src="https://res.cloudinary.com/dgsmgz8zl/image/upload/v1742966837/RPS-Logo_cibkvz.png"
          alt="rock paper scissor"
        />
        <h1>Rock Paper Scissor</h1>
      </div>
      <div className="game-rules">
        <h1>Rules</h1>
        <ul className="rules-list">
          <li>
            The game result should be based on user and user opponent choices.
          </li>
          <li>
            When the user choice is rock and his opponent choice is rock then
            the result will be <span>IT IS DRAW</span>.
          </li>
          <li>
            When the user choice is paper and his opponent choice is rock then
            the result will be <span>YOU WON</span>.
          </li>
          <li>
            When the user choice is a scissor and his opponent choice is rock
            then the result will be <span>YOU LOSE</span>.
          </li>
          <li>
            When the user choice is paper and his opponent choice is paper then
            the result will be <span>IT IS DRAW</span>.
          </li>
          <li>
            When the user choice is scissors and his opponent choice is paper
            then the result will be <span>YOU WON</span>.
          </li>
          <li>
            When the user choice is rock and his opponent choice is scissors
            then the result will be <span>YOU WON</span>.
          </li>
          <li>
            When the user choice is paper and his opponent choice is scissors
            then the result will be <span>YOU LOSE</span>.
          </li>
          <li>
            When the user choice is scissors and his opponent choice is scissors
            then the result will be <span>IT IS DRAW</span>.
          </li>
          <li>
            When the result is <span>YOU WON</span>, then the count of the score
            should be incremented by 1.
          </li>
          <li>
            When the result is <span>IT IS DRAW</span>, then the count of the
            score should be the same.
          </li>
          <li>
            When the result is <span>YOU LOSE</span>, then the count of the
            score should be decremented by 1.
          </li>
        </ul>
        <Link to="/rock-paper-scissor-home" className="link">
          <button type="button" className="start-playing">
            Start playing
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default RockPaperScissor
