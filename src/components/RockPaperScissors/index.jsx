import { Link } from 'react-router-dom';
import './index.css';

const EmojiGameHomePage = () => {
  return (
    <div className="container">
      <h1 className="welcome-title">Welcome to <br /> Rock Paper Scissors</h1>
        <div className="rules-logo-container">
          <img 
            src="RPS-Logo.png" 
            alt="Emoji" 
            className="side-image"
          />
        </div>

      <div className="button-row">
        <Link to="/rock-paper-scissors">
          <button className="action-button">Start Playing</button>
        </Link>
        <Link to="/">
          <button className="action-button">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default EmojiGameHomePage;
