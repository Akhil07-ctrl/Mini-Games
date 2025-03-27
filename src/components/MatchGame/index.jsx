import { Link } from 'react-router-dom';
import './index.css';

const EmojiGameHomePage = () => {
  return (
    <div className="card-match-container">
      <h1 className="welcome-title">Welcome to <br />Card Match</h1>
        <div className="rules-logo-container">
          <img 
            src="https://res.cloudinary.com/dgsmgz8zl/image/upload/v1742966837/Match-Game-Logo_nk3f2c.png" 
            alt="card-match" 
            className="match-image"
          />
        </div>

      <div className="card-match-buttons-container">
        <Link to="/match-game">
          <button className="match-button">Start Playing</button>
        </Link>
        <Link to="/">
          <button className="match-button">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default EmojiGameHomePage;
