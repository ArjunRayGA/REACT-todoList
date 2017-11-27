import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);
const loginPostData = {user: {token: ""}}
mock.onPost('http://localhost:4741/sign-in').reply(200, loginPostData)
const eventsGetData = {events: []}
mock.onGet('http://localhost:4741/events').reply(200, eventsGetData)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
