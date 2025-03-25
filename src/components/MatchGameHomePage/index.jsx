import {Link} from "react-router-dom";
import {Component} from 'react'
import './index.css'

class MatchGameHomePage extends Component {
  constructor(props) {
    super(props)
    const {imagesList} = props
    const storedBestScore = parseInt(localStorage.getItem('matchGameBestScore')) || 0;

    this.state = {
      score: 0,
      bestScore: storedBestScore,
      seconds: 60,
      selectedTab: 'FRUIT',
      imageToMatch: imagesList[0].imageUrl,
      isGameOver: false,
    }
  }

  componentDidMount() {
    this.startTimer()
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      this.setState(prevState => {
        if (prevState.seconds === 0) {
          clearInterval(this.timerId)
          return {isGameOver: true}
        }
        return {seconds: prevState.seconds - 1}
      })
    }, 1000)
  }

  updateBestScore = (currentScore) => {
    const storedBest = parseInt(localStorage.getItem('matchGameBestScore')) || 0
    if (currentScore > storedBest) {
      localStorage.setItem('matchGameBestScore', currentScore)
    }
  }

  resetGame = () => {
    clearInterval(this.timerId)
    const {score} = this.state
    let currentBest = parseInt(localStorage.getItem('bestScore')) || 0;
    const newBest = Math.max(currentBest,score);
    localStorage.setItem("matchGameBestScore",newBest);
    this.setState(
      {
        score: 0,
        bestScore: newBest,
        seconds: 60,
        isGameOver: false,
        imageToMatch: this.getRandomImage(),
      },
      this.startTimer,
    )
  }

  changeTab = tabId => {
    this.setState({selectedTab: tabId})
  }

  getRandomImage = () => {
    const {imagesList} = this.props
    const randomIndex = Math.floor(Math.random() * imagesList.length)
    return imagesList[randomIndex].imageUrl
  }

  onImageClick = clickedImageUrl => {
    const {imageToMatch} = this.state

    if (clickedImageUrl === imageToMatch) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        imageToMatch: this.getRandomImage(),
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({isGameOver: true})
    }
  }

  render() {
    const {score, bestScore, seconds, selectedTab, isGameOver, imageToMatch} = this.state
    const {tabsList, imagesList} = this.props
    const filteredList = imagesList.filter(
      each => each.category === selectedTab,
    )

    return (
      <div className="match-game-container">
        <nav className="navbar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="score-timer-container">
            <p className="score">
              Score: <span>{score}</span>
            </p>
            <p className="score">
              Best Score : <span>{bestScore}</span>  
            </p>
            <div className="timer-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-logo"
              />
              <p className="timer">{seconds} Sec</p>
            </div>
          </div>
        </nav>
        {isGameOver ? (
          <div className="game-over-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
              alt="trophy"
              className="trophy"
            />
            <p className="final-score">YOUR SCORE: {score} </p>
            <button
              type="button"
              className="play-again-btn"
              onClick={this.resetGame}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                alt="reset"
                className="reset-img"
              />
              Play Again
            </button>
          </div>
        ) : (
          <div className="game-container">
            <img src={imageToMatch} alt="match" className="main-match-image" />
            <ul className="tabs-container">
              {tabsList.map(each => (
                <li key={each.tabId}>
                  <button
                    type="button"
                    onClick={() => this.changeTab(each.tabId)}
                    className={
                      each.tabId === selectedTab ? 'active-tab' : 'inactive-tab'
                    }
                  >
                    {each.displayText}
                  </button>
                </li>
              ))}
            </ul>
            <ul className="thumbnails-container">
              {filteredList.map(each => (
                <li key={each.id}>
                  <button
                    className="thumbnail-btn"
                    type="button"
                    onClick={() => this.onImageClick(each.imageUrl)}
                  >
                    <img
                      src={each.thumbnailUrl}
                      alt={`thumbnail ${each.id}`}
                      className="thumbnail-image"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link to="/match-game-home">
          <button className="back-button" type="button">Back</button>
        </Link>
      </div>
    )
  }
}

export default MatchGameHomePage