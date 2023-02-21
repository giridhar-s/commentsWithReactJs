import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleIsLike, deleteComment} = props
  const {
    id,
    username,
    comment,
    date,
    isLiked,
    initialClassName,
  } = commentDetails

  const likeImageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const changeColor = isLiked ? 'like-color' : 'unlike-color'

  const onClickLike = () => {
    toggleIsLike(id)
  }

  const onDelete = () => {
    deleteComment(id)
  }

  return (
    <li className="comment-details-container">
      <div className="section-1">
        <div className="logo">
          <p className={`username ${initialClassName}`}>{username[0]}</p>
        </div>
        <div className="name-time-comment">
          <div className="name-and-time">
            <p className="username-logo">{username}</p>
            <p className="time">{date}</p>
          </div>
          <div className="comment-box">
            <p className="comment">{comment}</p>
          </div>
        </div>
      </div>
      <div className="section-2">
        <button className="like-btn" type="button" onClick={onClickLike}>
          <img src={likeImageUrl} alt="like" />
          <p className={`like-name ${changeColor}`}>Like</p>
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={onDelete}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-logo"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
