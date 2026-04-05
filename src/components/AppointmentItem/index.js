import './index.css'

const AppointmentItem = props => {
  const {details, toggleStar} = props
  const {id, title, date, isStarred} = details

  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleStar(id)
  }

  return (
    <li className="appointment-item">
      <div className="item-top">
        <p className="title">{title}</p>
        <button
          type="button"
          className="star-btn"
          onClick={onClickStar}
          data-testid="star"
        >
          <img src={starImg} alt="star" className="star-img" />
        </button>
      </div>

      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem
