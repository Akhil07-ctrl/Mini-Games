import {Link} from 'react-router-dom'
import {BiArrowBack} from 'react-icons/bi'
import '../../GameRulesView.css'

const MemoryMatrix = () => (
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
          src="https://res.cloudinary.com/dgsmgz8zl/image/upload/v1742966837/Match-Game-Logo_nk3f2c.png"
          alt="memory matrix"
        />
        <h1>Memory Matrix</h1>
      </div>
      <div className="game-rules">
        <h1>Rules</h1>
        <ul className="rules-list">
          <li>
            In each level of the Game, Users should be able to see the Grid with
            (N X N) size starting from 3 and the grid will highlight N cells in
            Blue, the N highlighted cells will be picked randomly.
          </li>
          <li>
            The highlighted cells will remain N seconds for the user to memorize
            the cells. At this point, the user should not be able to perform any
            action.
          </li>
          <li>After N seconds, the grid will clear the N highlighted cells.</li>
          <li>
            At N seconds, the user can click on any cell. Clicking on a cell
            that was highlighted before it will turn blue. Clicking on the other
            cells that were not highlighted before then will turn to red.
          </li>
          <li>
            The user should be promoted to the next level if they guess all N
            cells correctly in one attempt.
          </li>
          <li>
            The user should be taken to the results page if the user clicks on
            the wrong cell.
          </li>
          <li>
            If the user completed all the levels, then the user should be taken
            to the results page.
          </li>
        </ul>
        <Link to="/memory-matrix-home" className="link">
          <button type="button" className="start-playing">
            Start playing
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default MemoryMatrix
