import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  componentDidMount() {
  const storedList = localStorage.getItem('appointments')
  if (storedList !== null) {
    this.setState({appointmentsList: JSON.parse(storedList)})
  }
}

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
  
    if (title === '' || date === '') return
  
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
  
    this.setState(
      prev => ({
        appointmentsList: [...prev.appointmentsList, newAppointment],
        title: '',
        date: '',
      }),
      () => {
        localStorage.setItem(
          'appointments',
          JSON.stringify(this.state.appointmentsList),
        )
      },
    )
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each =>
        each.id === id ? {...each, isStarred: !each.isStarred} : each,
      ),
    }))
  }

  toggleFilter = () => {
    this.setState(prev => ({isFilterActive: !prev.isFilterActive}))
  }

  getFilteredList = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(each => each.isStarred)
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filteredList = this.getFilteredList()

    return (
      <div className="app-container">
        <div className="appointments-card">
          <div className="top-section">
            <form className="form" onSubmit={this.onAddAppointment}>
              <h1 className="heading">Add Appointment</h1>

              <label className="label" htmlFor="title">
                TITLE
              </label>
              <input
                className="input"
                id="title"
                value={titleInput}
                onChange={this.onChangeTitle}
              />

              <label className="label" htmlFor="date">
                DATE
              </label>
              <input
                type="date"
                id="date"
                className="input"
                value={dateInput}
                onChange={this.onChangeDate}
              />

              <button type="submit" className="add-btn">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="image"
            />
          </div>

          <hr className="line" />

          <div className="bottom-section">
            <h1 className="heading">Appointments</h1>

            <button
              type="button"
              className={`starred-btn ${isFilterActive ? 'active' : ''}`}
              onClick={this.toggleFilter}
            >
              Starred
            </button>
          </div>

          <ul className="appointments-list">
            {filteredList.map(each => (
              <AppointmentItem
                key={each.id}
                details={each}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
