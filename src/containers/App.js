// IMPORT PACKAGES, REACT FIRST
import React, {Component} from 'react'
import axios from 'axios'
import { createBrowserHistory } from 'history' 

// IMPORT ASSETS (IMAGES, STYLES, ETC)
import logo from '../assets/images/logo.svg'
import '../assets/css/App.css'

// IMPORT COMPONENTS
import {Router, Route, Link} from 'react-router-dom'
import EventForm from './EventForm'
import LoginForm from '../components/LoginForm'
import DisplayLoginInfo from '../components/DisplayLoginInfo'

// create history object to allow navigation history and pushing routes
const history = createBrowserHistory()

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
      }
    }

    // bind 'this' context to class methods
    const bindMethods = ['loginPost', 'userNameChange', 'passwordChange', 'loginSubmit']
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
    }, this.loginPost)
  }

  // HTTP REQUESTS
  loginPost() {
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
        history.push('/events')
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
    this.loginPost()
  }

  render() {
    const RenderedLoginForm = () => {
      return (
        <LoginForm
          password={this.state.auth.password}
          username={this.state.auth.userName}
          userNameChange={this.userNameChange}
          passwordChange={this.passwordChange}
          loginSubmit={this.loginSubmit}/>
        )

    }
    const RenderedDisplayLoginInfo = () => {
      return (  
        <DisplayLoginInfo
          password={this.state.auth.password}
          username={this.state.auth.userName}
          token={this.state.auth.token}/>
      )
    }
    const RenderedEventForm = () => {
      return (  
        <EventForm
          backend={this.backend}
          auth={this.state.auth}
          />
      )
    }

    const listItemStyle = {
      display: 'inline',
      paddingLeft: '10px',
      paddingRight: '10px'
    }

    return (
      <Router history={history}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React Todo List</h1>
          </header>
          <ul>
            <li style={listItemStyle}><Link to='/'>Login</Link></li>
            <li style={listItemStyle}><Link to='/login-info'>Display Login Info</Link></li>
            <li style={listItemStyle}><Link to='/events'>Events</Link></li>
          </ul>
          
          <Route exact path='/' component={RenderedLoginForm} />
          <Route path='/login-info' component={RenderedDisplayLoginInfo} />
          <Route path='/events' component={RenderedEventForm} />
        </div>
      </Router>
    );
  }
}

export default App;