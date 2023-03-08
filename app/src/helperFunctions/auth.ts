const fetch = require('node-fetch');
const isDev = process.env.NODE_ENV === 'development';
const { DEV_PORT } = require('../../../config');
let serverURL = 'https://reactype-caret.herokuapp.com';
if (isDev) {
  // serverURL = `http://localhost:${DEV_PORT}`;  // BW NOTE:  3/7/2023 - Documenting this out for same reason as change to line 31 in LoginButton.tsx page
  serverURL = '/0.0.0.0:5656/#'; // /0.0.0.0 for Heroku (https://help.heroku.com/P1AVPANS/why-is-my-node-js-app-crashing-with-an-r10-error) & DEV_PORT: 5656 from config.js file
}
export const sessionIsCreated = (
  username: string,
  password: string,
  isFbOauth: boolean
): Promise<string> => {
  const body = JSON.stringify({
    username,
    password,
    isFbOauth
  });
  const result = fetch(`/login`, {
    // BW NOTE:  3/7/2023 - REMOVED ${serverURL} here from `${serverURL}/login`
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.sessionId && typeof data.sessionId === 'string') {
        // check that a session id was passed down
        window.localStorage.setItem('ssid', data.sessionId);
        // save username locally, will be added to saved project for each user
        window.localStorage.setItem('username', username);
        return 'Success';
      }
      return data; // error message returned from userController.verifyUser
    })
    .catch((err) => 'Error');
  return result;
};
export const newUserIsCreated = (
  username: string,
  email: string,
  password: string
): Promise<string> => {
  const body = JSON.stringify({
    username,
    email,
    password
  });
  const result = fetch(`/signup`, {
    // BW NOTE:  3/7/2023 - REMOVED ${serverURL} here from `${serverURL}/signup`
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.sessionId && typeof data.sessionId === 'string') {
        // check that a session id was passed down
        window.localStorage.setItem('ssid', data.sessionId);
        // save username locally, will be added to saved project for each user
        window.localStorage.setItem('username', username);
        return 'Success';
      }
      return data; // response is either Email Taken or Username Taken, refer to userController.createUser
    })
    .catch((err) => 'Error');
  return result;
};
