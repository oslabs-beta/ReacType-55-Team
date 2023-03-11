import React, { Component, useState, useEffect } from 'react';
import { LoginInt } from '../../interfaces/Interfaces';
import {
  Link as RouteLink,
  withRouter,
  useHistory,
  RouteComponentProps
} from 'react-router-dom';
import { newUserIsCreated } from '../../helperFunctions/auth';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { element } from 'prop-types';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/actions.js';

import { MuiThemeProvider } from '@material-ui/core/styles';
import {
  SigninDark,
  SigninLight
} from '../../../../app/src/public/styles/theme';

const mapDispatchToProps = (dispatch) => ({
  darkModeToggle: () => {
    dispatch(actions.darkModeToggle());
  }
});

const mapStateToProps = (state) => {
  return {
    darkMode: state.darkModeSlice.darkMode
  };
};

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © ReacType '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#3EC1AC'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  root: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3EC1AC'
    }
  }
}));

const SignUp: React.FC<LoginInt & RouteComponentProps> = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [invalidEmailMsg, setInvalidEmailMsg] = useState('');
  const [invalidUsernameMsg, setInvalidUsernameMsg] = useState('');
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('');
  const [invalidVerifyPasswordMsg, setInvalidVerifyPasswordMsg] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidVerifyPassword, setInvalidVerifyPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;
    switch (e.target.name) {
      case 'email':
        setEmail(inputVal);
        break;
      case 'username':
        setUsername(inputVal);
        break;
      case 'password':
        setPassword(inputVal);
        break;
      case 'passwordVerify':
        setPasswordVerify(inputVal);
        break;
    }
  };

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // Reset Error Validation
    setInvalidEmailMsg('');
    setInvalidUsernameMsg('');
    setInvalidPasswordMsg('');
    setInvalidVerifyPasswordMsg('');
    setInvalidEmail(false);
    setInvalidUsername(false);
    setInvalidPassword(false);
    setInvalidVerifyPassword(false);

    if (email === '') {
      setInvalidEmail(true);
      setInvalidEmailMsg('No Email Entered');
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setInvalidEmail(true);
      setInvalidEmailMsg('Invalid Email Format');
      return;
    } else {
      setInvalidEmail(false);
    }

    if (username === '') {
      setInvalidUsername(true);
      setInvalidUsernameMsg('No Username Entered');
      return;
    } else if (!/^[\w\s-]{4,15}$/i.test(username)) {
      setInvalidUsername(true);
      setInvalidUsernameMsg('Must Be 4 - 15 Characters Long');
      return;
    } else if (!/^[\w-]+$/i.test(username)) {
      setInvalidUsername(true);
      setInvalidUsernameMsg('Cannot Contain Spaces or Special Characters');
      return;
    } else {
      setInvalidUsername(false);
    }

    if (password === '') {
      setInvalidPassword(true);
      setInvalidPasswordMsg('No Password Entered');
      return;
    } else if (password.length < 8) {
      setInvalidPassword(true);
      setInvalidPasswordMsg('Minimum 8 Characters');
      return;
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(
        password
      )
    ) {
      setInvalidPassword(true);
      setInvalidPasswordMsg('Minimum 1 Letter, Number, and Special Character');
      return;
    } else if (password !== passwordVerify) {
      setInvalidPassword(true);
      setInvalidVerifyPassword(true);
      setInvalidPasswordMsg('Verification Failed');
      setInvalidVerifyPasswordMsg('Verification Failed');
      setPasswordVerify('');
      return;
    } else {
      setInvalidPassword(false);
    }

    if (password !== passwordVerify) {
      setInvalidPassword(true);
      setInvalidVerifyPassword(true);
      setInvalidPasswordMsg('Verification Failed');
      setInvalidVerifyPasswordMsg('Verification Failed');
      setPasswordVerify('');
      return;
    } else {
      setInvalidVerifyPassword(false);
    }

    newUserIsCreated(username, email, password).then((userCreated) => {
      if (userCreated === 'Success') {
        props.history.push('/');
      } else {
        switch (userCreated) {
          case 'Email Taken':
            setInvalidEmail(true);
            setInvalidEmailMsg('Email Taken');
            break;
          case 'Username Taken':
            setInvalidUsername(true);
            setInvalidUsernameMsg('Username Taken');
            break;
        }
      }
    });
  };

  return (
    <MuiThemeProvider theme={!props.darkMode ? SigninLight : SigninDark}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Button
            color="primary"
            style={{
              minWidth: '113.97px',
              top: 10,
              right: 20,
              position: 'absolute'
            }}
            // onClick={() => {
            //   props.darkModeToggle();  // BW Documented out 3/11/2023
            // }}
          >
            {/* {`Dark Mode: ${props.darkMode}`} */}
            3/11/2023
          </Button>
          <Avatar className={classes.avatar}>
            <AssignmentIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="textPrimary">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className={classes.root}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={handleChange}
                  helperText={invalidEmailMsg}
                  error={invalidEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.root}
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={handleChange}
                  helperText={invalidUsernameMsg}
                  error={invalidUsername}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.root}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={handleChange}
                  helperText={invalidPasswordMsg}
                  error={invalidPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.root}
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordVerify"
                  label="Verify Password"
                  type="password"
                  id="passwordVerify"
                  autoComplete="verify-password"
                  value={passwordVerify}
                  onChange={handleChange}
                  helperText={invalidVerifyPasswordMsg}
                  error={invalidVerifyPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => handleSignUp(e)}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouteLink
                  style={{ color: props.darkMode ? '#aaaaaa' : 'black' }}
                  to={`/login`}
                  className="nav_link"
                >
                  Already have an account? Sign In
                </RouteLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </MuiThemeProvider>
  );
};

// export default withRouter(SignUp);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
