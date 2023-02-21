import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem/index'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommentsList = []

class Comments extends Component {
  state = {username: '', comment: '', commentsList: initialCommentsList}

  toggleIsLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {username, comment} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: uuidv4(),
      username,
      comment,
      date: formatDistanceToNow(new Date()),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      username: '',
      comment: '',
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filteredCommentsList = commentsList.filter(
      eachList => eachList.id !== id,
    )
    this.setState({commentsList: filteredCommentsList})
  }

  render() {
    const {username, comment, commentsList} = this.state
    const lengthOfList = commentsList.length
    return (
      <div className="comments-container">
        <div className="user-input-container">
          <div className="user-input-section">
            <h1 className="main-heading">Comments</h1>
            <p className="tag-line">Say something about 4.0 Technologies</p>
            <form className="form-container" onSubmit={this.onAddComment}>
              <input
                type="text"
                className="user-input"
                placeholder="Your Name"
                value={username}
                onChange={this.onChangeUsername}
              />
              <br />
              <textarea
                className="user-comment"
                placeholder="Your Comment"
                rows="5"
                cols="20"
                value={comment}
                onChange={this.onChangeComment}
              />
              <br />
              <button type="submit" className="submit-button">
                Add Comment
              </button>
            </form>
          </div>

          <div className="user-logo-section">
            <h1 className="main-heading heading-in-img-section">Comments</h1>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-image"
            />
          </div>
        </div>

        <div className="comments-list-container">
          <div className="comments-heading-section">
            <div className="comments-count">{lengthOfList}</div>
            <p className="comments-heading">Comments</p>
          </div>
          <ul>
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                toggleIsLike={this.toggleIsLike}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
