import React from 'react';

const Event = (props) => {

  const eventStyle = {
    background: 'transparent',
    outline: '0',
    width: '200px'
  }

  const selectedEventStyle = {
    border: '1px solid black',
    ...eventStyle
  }

  const unselectedEventStyle = {
    border: '0',
    ...eventStyle
  }

  const eventButtonStyle = {
     border: '1px solid gray',
     background: 'lightgray',
     marginLeft: '5px'
  }

  const hiddenEventButtonStyle = {
    visibility: 'hidden',
    ...eventButtonStyle
  }

  return (
    <li>
      <input
        id={`event-${props.eventId}`}
        onDoubleClick={props.setSelectedEvent}
        onChange={props.setEventTitle}
        readOnly={!props.selected}
        style={props.selected 
            ? selectedEventStyle
            : unselectedEventStyle}
        value={props.title}/>
        <button style={props.selected
            ? eventButtonStyle
            : hiddenEventButtonStyle}
        data-id={props.eventId}            
        onClick={props.submitEventEdit}
        >Submit</button>
        <button style={props.selected
            ? eventButtonStyle
            : hiddenEventButtonStyle}
        data-id={props.eventId}
        onClick={props.cancelEventEdit}            
        >Cancel</button>
    </li>
  )
}

export default Event