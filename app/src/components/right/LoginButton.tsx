import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import StateContext from '../../context/context';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'; //  BW ADDED for logout functionality, SEE <Link to="/logout/login"> @ bottom

export default function LoginButton() {
  const history = useHistory();
  const [state] = useContext(StateContext);
  // const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   // clear local storage
  //   window.localStorage.clear();
  //   // destroy cookie in production via electron main process
  //   window.api.delCookie();
  //   // destroys cookie by backdating expiration time
  //   // document.cookie = 'ssid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  //   // uses useHistory to return to the login page
  //   history.push('/login');
  // };

  const handleLogout = () => {
    window.localStorage.clear();
    if (process.env.NODE_ENV === 'production') {
      console.log('BEFORE isloggedin: ', state.isLoggedIn);
      state.isLoggedIn = true; // BW ADDED 3/8/2023
      console.log('AFTER isloggedin: ', state.isLoggedIn);
      window.api.delCookie();
      window.location.href = '/index-prod.html';
    } else {
      // window.location.href = 'http://localhost:8080/#/login';  // REMOVING JUST FOR deploying to Heroku
      console.log('BEFORE isloggedin: ', state.isLoggedIn);
      state.isLoggedIn = true; // BW ADDED 3/8/2023
      console.log('AFTER isloggedin: ', state.isLoggedIn);
      window.api.delCookie();
      window.location.href = '/0.0.0.0:5656/#/login'; // /0.0.0.0 for Heroku (https://help.heroku.com/P1AVPANS/why-is-my-node-js-app-crashing-with-an-r10-error) & DEV_PORT: 5656 from config.js file
    }
  };
  if (state.isLoggedIn) {
    return (
      <Link to="/logout">
        <Button
          id="navbarButton"
          variant="contained"
          color="secondary"
          className="navbarButton"
          style={{ minWidth: '102.11px' }}
          onClick={handleLogout}
          endIcon={<ExitToAppIcon />}
        >
          Log Out
        </Button>
      </Link>
    );
  }
  return (
    <Link to="/login">
      <Button
        variant="contained"
        color="secondary"
        className="navbarButton"
        style={{ minWidth: '102.11px' }}
        onClick={handleLogout}
        endIcon={<ExitToAppIcon />}
      >
        Log In
      </Button>
    </Link>
  );
}
