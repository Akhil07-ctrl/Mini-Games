import { Link } from 'react-router-dom';
import './index.css';

const FlipCard = () => {
  return (
    <div className="container">
      <h1 className="welcome-title">Welcome to The <br /> Flip Card</h1>
        <div className="rules-logo-container">
          <img 
            src="Flip-Card-Logo.png" 
            alt="Emoji" 
            className="side-image"
          />
        </div>

      <div className="button-row">
        <Link to="/flip-card">
          <button className="action-button">Start Playing</button>
        </Link>
        <Link to="/">
          <button className="action-button">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default FlipCard;
