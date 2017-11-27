import React, {Component} from 'react'
import axios from 'axios'

import Event from './Event'

class EventForm extends Component {
  constructor(props) {
    super(props)

    this.backend = this.props.backend

    this.state = {
      events: [],
      selectedEvent: null
    }

    const bindMethods = ['setEventTitle', 'setSelectedEvent', 'submitEventEdit', 'cancelEventEdit', 'clearSelectedEvent']
    bindMethods.forEach(method => {
      this[method] = this[method].bind(this)
    })

  }

  componentWillMount() {
    this.getEventsRequest()
  }

  getEventsRequest() {
    return axios
      .get(`${this.backend}/events`, {
      headers: {
        'Authorization': 'Token token=' + this.props.auth.token
      }
    })
      .then(response => {
        const events = response.data.events
        this.setState({events: events})
      })
      .catch(error => {
        console.error('get events failed!', error.response)
      })
  }

  patchEventRequest(eventId, data) {
    return axios.patch(`${this.backend}/events/${eventId}`, {
      event: {
        title: data.title
      }
    }, {
      headers: {
        'Authorization': 'Token token=' + this.props.auth.token,
        'Content-Type': 'application/json'
      }
    })
    .then(this.clearSelectedEvent)
    .catch(error => {
      console.error('patch event failed!', error.response)
      this.getEventsRequest()
    })
  }

  setEventTitle(event) {
    const eventId = event.target.id.replace('event-', '')
    const newVal = event.target.value
    this.setState(prevState => {
      const newState = Object.assign({}, prevState)
      window.newState = newState
      const editedIdx = newState.events.findIndex(event => eventId === `${event.id}`)
      newState.events[editedIdx].title = newVal
      return newState
    })
  }

  setSelectedEvent(event) {
    const eventId = event.target.id.replace('event-', '')    
    this.setState({selectedEvent: eventId})
  }

  clearSelectedEvent() {
    this.getEventsRequest()
    .then(() => {
      this.setState({selectedEvent: null})
    })
  }

  submitEventEdit(event) {
    event.preventDefault()
    const eventId = event.target.dataset.id      
    const titleVal = document.querySelector(`#event-${eventId}`).value
    this.patchEventRequest(eventId, {title: titleVal})    
  }

  cancelEventEdit(event) {
    event.preventDefault()
    this.clearSelectedEvent()
  }

  render() {

    const eventsList = this.state.events.map(event => {
        return (
          <Event
            selected={`${event.id}` === this.state.selectedEvent}
            setEventTitle={this.setEventTitle}
            setSelectedEvent={this.setSelectedEvent}
            cancelEventEdit={this.cancelEventEdit}
            submitEventEdit={this.submitEventEdit}
            key={event.id}
            eventId={event.id}
            title={event.title}/>
        )
      })

    return (
      <div>
        <ul>
          {eventsList}
        </ul>
      </div>
    )
  }
}

export default EventForm;