import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import StateContext from '../../context/context';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'; // ADDED for logout functionality

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
      window.api.delCookie();
      // window.location.href = '/app/dist/index-prod.html';
      window.location.href = '/0.0.0.0:5656/#/login'; // DEV_PORT: 5656 from config.js file
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

// ---------
// ADDED BELOW items

// import { Link, Route, Routes, useNavigate } from 'react-router-dom'; // ADDED for logout functionality

// } else {
//   // window.location.href = 'http://localhost:8080/#/login';  // REMOVING JUST FOR deploying to Heroku
//   window.api.delCookie();
//   window.location.href = '/app/dist/index-prod.html';
// }

// <Link to="/logout">
// <Link to="/login">

// MISSING BELOW ROUTES to return to login/signup page...

// <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/board" element={<Board />} />
//         <Route path="/login" element={<Login setUserId={setUserId} />} />
//         <Route path="/signup" element={<SignUp />} />
//       </Routes>
