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
      window.api.delCookie();
      window.location.href = '/index-prod.html';
    } else {
      // window.location.href = 'http://localhost:8080/#/login';  // REMOVING JUST FOR deploying to Heroku
    }
  };
  console.log('LS2 = ', window.localStorage.getItem('ssid'));
  if (window.localStorage.getItem('ssid') === 'guest') state.isLoggedIn = true; // BW ADDED - 3/9/2023
  if (state.isLoggedIn) {
    console.log('/logout path entered'); // BW - TO DELETE
    return (
      <Link to="/login">
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
  console.log('/login path entered'); // BW - TO DELETE
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
