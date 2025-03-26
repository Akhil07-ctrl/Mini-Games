import './index.css'

const EmojiNavBar = ({score, topscore}) => (
  <nav>
    <div className="left">
      <img
        src="https://res.cloudinary.com/dgsmgz8zl/image/upload/v1742966834/Emoji-Logo_aluka5.png"
        alt="emoji logo"
      />
      <h1>Emoji Memory</h1>
    </div>
    <div className="right">
      <p className="score">Top Score: {topscore}</p>
      <p className="score">Score: {score}</p>
    </div>
  </nav>
)

export default EmojiNavBar
