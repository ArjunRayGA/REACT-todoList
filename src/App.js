// IMPORT PACKAGES, REACT FIRST
import React, {Component} from 'react';
import axios from 'axios';

// IMPORT ASSETS (IMAGES, STYLES, ETC)
import logo from './logo.svg';
import './App.css';

// IMPORT COMPONENTS
import EventForm from './EventForm';
import LoginForm from './LoginForm';
import DisplayLoginInfo from './DisplayLoginInfo';

class App extends Component {
  constructor(props) {
    super(props)

    // set vars that don't change, ie not state
    this.backend = 'http://localhost:4741'

    // set vars to describe the state of the App component
    this.state = {
      auth: {
        userName: '',
        password: '',
        token: null
      },
      _triggerChildren: { // changing these values at all trigger actions in certain child components
        getEventsRequest: false
      }
    }

    // bind 'this' context to class methods
    const bindMethods = ['loginRequest', 'userNameChange', 'passwordChange', 'loginSubmit']
    bindMethods.forEach(method => {
      this[method] = this[method].bind(this)
    })

  }

  // trick to get auto-login on load (remove later)
  componentDidMount() {
    this.setState(prevState => {
      const newState = Object.assign({}, prevState)
      newState.auth.userName = 'acarlotto@cox.net'
      newState.auth.password = 'summer'
      return newState
    }, this.loginRequest)
  }

  // HTTP REQUESTS
  loginRequest() {
    axios
      .post(`${this.backend}/sign-in`, {
      credentials: {
        email: this.state.auth.userName,
        password: this.state.auth.password
      }
    })
      .then(response => {
        const authToken = response.data.user.token
        this.setState(prevState => {
          const newState = Object.assign({}, prevState)
          newState.auth.token = authToken
          return newState
        })
      })
      .then(() => {
        this.setState(prevState => {
          const newState = Object.assign({}, prevState)
          newState._triggerChildren.getEventsRequest = !newState._triggerChildren.getEventsRequest
          return newState
        })
      })
      .catch(error => {
        console.error('login failed!', error)
      })
  }

  // EVENT HANDLERS
  userNameChange(event) {
    const userName = event.target.value
    this.setState((prevState) => {
      const newState = Object.assign({}, prevState)
      newState.auth.userName = userName
      return newState
    })
  }

  passwordChange(event) {
    const password = event.target.value
    this.setState(prevState => {
      const newState = Object.assign({}, prevState)
      newState.auth.password = password
      return newState
    })
  }

  loginSubmit(event) {
    event.preventDefault()
    this.loginRequest()
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
          password={this.state.auth.password}
          username={this.state.auth.userName}
          userNameChange={this.userNameChange}
          passwordChange={this.passwordChange}
          loginSubmit={this.loginSubmit}/>
        <DisplayLoginInfo
          password={this.state.auth.password}
          username={this.state.auth.userName}
          token={this.state.auth.token}/>
        <EventForm
          triggerGetEvents={this.state._triggerChildren.getEventsRequest}
          backend={this.backend}
          auth={this.state.auth}
          />
      </div>
    );
  }
}

export default App;