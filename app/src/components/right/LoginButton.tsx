import React, { useContext, useState } from 'react'; //  BW ADDED useState to clear canvas - 3/12/2023
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import StateContext from '../../context/context';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'; //  BW ADDED for logout functionality, SEE <Link to="/logout/login"> @ bottom

export default function LoginButton() {
  const history = useHistory();
  const [state, dispatch] = useContext(StateContext); //  BW ADDED dispatch in order to clear canvas - 3/12/2023
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
    console.log('OLD state: ', state); // TO DELETE
    dispatch({ type: 'RESET STATE', payload: {} }); //  BW ADDED dispatch in order to clear canvas - 3/12/2023
    console.log('NEW state: ', state); // TO DELETE

    window.localStorage.clear();
    if (process.env.NODE_ENV === 'production') {
      window.api.delCookie();
      window.location.href = '/index-prod.html';
    } else {
      // window.location.href = 'http://localhost:8080/#/login';  // REMOVING JUST FOR deploying to Heroku
    }
  };

  if (state.isLoggedIn || window.localStorage.getItem('ssid') === 'guest') {
    // BW ADDED 2nd condition ssid=guest - 3/12/2023
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
