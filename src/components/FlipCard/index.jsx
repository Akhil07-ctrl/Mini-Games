import { Link } from 'react-router-dom';
import './index.css';

const FlipCard = () => {
  return (
    <div className="flip-card-container">
      <h1 className="welcome-title">Welcome to<br /> Flip Card</h1>
        <div className="rules-logo-container">
          <img 
            src="https://res.cloudinary.com/dgsmgz8zl/image/upload/v1742966834/Flip-Card-Logo_rzygvw.png" 
            alt="flip-card-logo" 
            className="flip-image"
          />
        </div>

      <div className="flip-card-buttons-container">
        <Link to="/flip-card">
          <button className="flip-button">Start Playing</button>
        </Link>
        <Link to="/">
          <button className="flip-button">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default FlipCard;
