import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import EventForm from './EventForm';
// import Events from './Events';
import LoginForm from './LoginForm';
import DisplayLoginInfo from './DisplayLoginInfo';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      token: null,
      events: [],
      selectedEvent: null
    }

    this.getState = this
      .getState
      .bind(this)
    this.submitLogin = this
      .submitLogin
      .bind(this)
    this.userNameChange = this
      .userNameChange
      .bind(this)
    this.passwordChange = this
      .passwordChange
      .bind(this)
    this.selectEvent = this
      .selectEvent
      .bind(this)      
  }

  //setter method
  selectEvent(event) {
    this.setState({
      selectedEvent: event.target.id
    })
    console.log(`I set selectedEvent state as ${event.target.id}!`)
  }

  // setter method
  setEvent(event) {
    const targetEventId = event.target.id
    const events = this.state.events
    // let eventStateId 
    // for(let n=0; n<=events.length; n++) {
    //    if(events[n].id == targetEventId ) {
    //      this.setState({
    //        events: Object.assign({}, this.state.events)
    //       })
    //    }
    // }
  }

  componentDidMount() {
    this.setState({userName: 'acarlotto@cox.net', password: 'summer'})
  }

  // getter method
  getState(event) {
    event.preventDefault()
    console.log(this.state)
  }

  // HTTP requests
  submitLogin(event) {
    event.preventDefault()
    console.log(this.state.userName, this.state.password)
    axios
      .post('http://localhost:4741/sign-in', {
      credentials: {
        email: this.state.userName,
        password: this.state.password
      }
    })
      .then(response => {
        const authToken = response.data.user.token
        this.setState({token: authToken})
        this.getEvents()
      })
    }
    
  getEvents() {      
    axios
        .get('http://localhost:4741/events', {
          headers: {
            'Authorization': 'Token token=' + this.state.token
        }
    })
    .then(response => {
        const events = response.data.events
        this.setState({events: events})
    })
  }

  eventTitle(event) {
    this.setState({event: event.target.value})
  }

  // state change handlers
  userNameChange(event) {
    // console.log('s')
    this.setState({userName: event.target.value})
  }

  passwordChange(event) {
    this.setState({password: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <LoginForm
          password={this.state.password}
          username={this.state.userName}
          userNameChange={this.userNameChange}
          passwordChange={this.passwordChange}
          submitLogin={this.submitLogin}/>

          <button onClick={this.getState}>get the state!</button>

        <DisplayLoginInfo
          password={this.state.password}
          username={this.state.userName}
          token={this.state.token}/> 
          {/* <button onClick={this.getState}>get the state!</button> */}
          
          <EventForm 
             selectedEvent={this.state.selectedEvent} 
             setEvent={this.setEvent} 
             selectEvent={this.selectEvent} 
             events={this.state.events}
            />

            {/* <Events 
              events={this.state.events}/> */}
      </div>
    );
  }
}

export default App;
