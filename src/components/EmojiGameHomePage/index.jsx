import { Link } from 'react-router-dom';
import './index.css';

const EmojiGameHomePage = () => {
  return (
    <div className="emoji-container">
      <h1 className="welcome-title">Welcome to<br /> Emoji Memory</h1>
        <div className="rules-logo-container">
          <img 
            src="https://res.cloudinary.com/dgsmgz8zl/image/upload/v1742966834/Emoji-Logo_aluka5.png" 
            alt="Emoji" 
            className="emoji-image"
          />
        </div>

      <div className="emoji-buttons-container">
        <Link to="/emoji-game">
          <button className="emoji-button">Start Playing</button>
        </Link>
        <Link to="/">
          <button className="emoji-button">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default EmojiGameHomePage;
