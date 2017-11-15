import React, {Component} from 'react';

class EventForm extends Component {
  constructor(props) {
    super(props)
    // this.state = {   events: this.props.events }
  }

  render() {
    return (
      <div>
        <ul>
          {this
            .props
            .events
            .map((event, i) => (<Event
              selectedEvent={this.props.selectedEvent}
              selectEvent={this.props.selectEvent}
              setEvent={this.props.setEvent}
              key={i}
              eventId={event.id}
              title={event.title}/>))
          }
        </ul>
      </div>
    )
  }
}

export default EventForm;

const Event = (props) => {
  const listStyle = {
    border: 'none'
  }

  return (
    <li>
      <input
        id={props.eventId}
        onDoubleClick={props.selectEvent}
        onChange={props.setEvent}
        style={listStyle}
        value={props.title}
         />
    </li>
  )
}



