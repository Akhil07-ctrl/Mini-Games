import { Link } from 'react-router-dom';
import './index.css';

const EmojiGameHomePage = () => {
  return (
    <div className="rps-container">
      <h1 className="welcome-title">Welcome to <br /> Rock Paper Scissors</h1>
        <div className="rules-logo-container">
          <img 
            src="https://res.cloudinary.com/dgsmgz8zl/image/upload/v1742966837/RPS-Logo_cibkvz.png" 
            alt="rps" 
            className="rps-image"
          />
        </div>

      <div className="rps-buttons-container">
        <Link to="/rock-paper-scissors">
          <button className="rps-button">Start Playing</button>
        </Link>
        <Link to="/">
          <button className="rps-button">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default EmojiGameHomePage;
