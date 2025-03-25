import {Component} from 'react'
import {Link} from "react-router-dom"
import EmojiCard from '../EmojiCard'
import EmojiWinOrLoseCard from '../EmojiWinOrLoseCard'
import EmojiNavBar from '../EmojiNavBar'
import './index.css'

class EmojiGameHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      score: 0,
      topscore: 0,
      clickedEmojis: [],
      shuffledEmojisList: [...props.emojisList],
      isGameOver: false,
      isWon: false,
      showPopup: false,
    }
  }

  componentDidMount() {
    // Retrieve topscore from localStorage (if any) when the component mounts
    const storedTopscore = localStorage.getItem('topscore')
    if (storedTopscore) {
      this.setState({ topscore: parseInt(storedTopscore, 10) })
    }
  }

  updateTopscore = newScore => {
    // Update state and localStorage with the new top score if it is higher
    this.setState(
      prevState => ({
        topscore: Math.max(newScore, prevState.topscore),
      }),
      () => {
        localStorage.setItem('topscore', this.state.topscore)
      },
    )
  }

  shuffledEmojisList = () => {
    this.setState(prevState => ({
      shuffledEmojisList: [...prevState.shuffledEmojisList].sort(
        () => Math.random() - 0.5,
      ),
    }))
  }

  emojiClick = id => {
    const {clickedEmojis, score} = this.state
    const {emojisList} = this.props

    if (clickedEmojis.includes(id)) {
      // Update topscore before ending the game
      this.updateTopscore(score)
      this.setState({
        isGameOver: true,
        isWon: false,
      })
    } else {
      const newScore = score + 1
      if (newScore === emojisList.length) {
        // Player wins, update topscore accordingly
        this.updateTopscore(newScore)
        this.setState({
          score: newScore,
          isGameOver: true,
          isWon: true,
        })
      } else {
        this.setState(
          {
            score: newScore,
            clickedEmojis: [...clickedEmojis, id],
          },
          this.shuffledEmojisList,
        )
      }
    }
  }

  onPlayAgain = () => {
    const {emojisList} = this.props
    this.setState({
      score: 0,
      clickedEmojis: [],
      shuffledEmojisList: [...emojisList],
      isGameOver: false,
      isWon: false,
    })
  }

  openPopup = () => {
    this.setState({showPopup: true})
  }

  closePopup = () => {
    this.setState({showPopup: false})
  }

  render() {
    const {score, topscore, shuffledEmojisList, isGameOver, isWon, showPopup} =
      this.state

    return (
      <div className="emojis-container">
        {!isGameOver && <EmojiNavBar score={score} topscore={topscore} />}
        <div className="emoji-game-content">
          {!isGameOver ? (
            <>
              <ul className="emojis-list">
                {shuffledEmojisList.map(each => (
                  <EmojiCard
                    key={each.id}
                    emojiDetails={each}
                    emojiClick={this.emojiClick}
                  />
                ))}
              </ul>
              <div className="popup-button-row">
                <button className="popup-button" onClick={this.openPopup}>
                  Rules
                </button>
                <Link to="/emoji-game-home">
                  <button className="popup-button">
                    Back
                  </button>
                </Link>
              </div>
            </>
          ) : (
            <EmojiWinOrLoseCard
              score={score}
              isWon={isWon}
              onPlayAgain={this.onPlayAgain}
            />
          )}
        </div>
        {showPopup && (
          <div className="modal-overlay">
            <div className="modal-content">
              <img
                src="Emoji-Game-Rules.png"
                alt="Rules"
                className="modal-image"
              />
              <button className="close-button" onClick={this.closePopup}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default EmojiGameHome
