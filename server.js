const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cookieParser = require('cookie-parser');
//const passport = require('passport');
//const GitHubStrategy = require('passport-github2').Strategy;
const { DEV_PORT } = require('../config');

const path = require('path');
const cors = require('cors');
const userController = require('./controllers/userController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');
const projectController = require('./controllers/projectController');

const app = express();

const PORT = process.env.PORT || DEV_PORT;
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser());

// Routes
const stylesRouter = require('./routers/stylesRouter');

// enable cors
// options: origin: allows from localhost when in dev or the app://rse when using prod, credentials: allows credentials header from origin (needed to send cookies)
app.use(
  cors({
    origin: [`http://localhost:8080`, 'app://rse'],
    credentials: true
  })
);

// TODO: github Oauth still needs debugging
// on initial login, redirect back to app is not working correctly when in production environment
// subsequent logins seem to be working fine, however

// NOTE from v13.0 team: GitHub OAuth works fine in Electron production app and the backend for Electron production app is deployed on Heroku at https://reactype-caret.herokuapp.com/ (get credentials from instructor )

// passport.use(
//   new GitHubStrategy(
//     {
//       clientID: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//       callbackURL: isDev
//         ? `http://localhost:${DEV_PORT}/github/callback`
//         : `https://reactype-caret.herokuapp.com/github/callback`
//     },
//     function(accessToken, refreshToken, profile, done) {
//       console.log(profile);
//     }
//   )
// );

// initializes passport and passport sessions
// app.use(passport.initialize());
// app.use(passport.session());

// app.get(
//   '/auth/github',
//   passport.authenticate('github', { session: false }),
//   (req, res) => {
//     res.send('github');
//   }
// );

// for Oauth which is currently not working
// app.get(
//   '/github/callback',
//   sessionController.gitHubResponse,
//   sessionController.gitHubSendToken,
//   userController.createUser,
//   userController.verifyUser,
//   cookieController.setSSIDCookie,
//   sessionController.startSession,
//   (req, res) => {
//     if (isDev) {
//       return res
//         .status(200)
//         .redirect(`http://localhost:8080?=${res.locals.ssid}`);
//     } else {
//       return res.status(200).redirect(`app://rse?=${res.locals.ssid}`);
//     }
//   }
// );

// app.get('/github/callback', passport.authenticate('github'), function(
//   req,
//   res
// ) {
//   console.log(req.user);
//   res.redirect('http://localhost:8080');
// });

/*
GraphQl Router
*/
/* ******************************************************************* */

// Query resolvers
const Query = require('./graphQL/resolvers/query');
// Mutation resolvers
const Mutation = require('./graphQL/resolvers/mutation');

// package resolvers into one variable to pass to Apollo Server
const resolvers = {
  Query,
  Mutation
};

// app.use(
//   '/demoRender',
//   express.static(path.join(__dirname, './assets/renderDemo.css'))
// );

// Re-direct to route handlers:
app.use('/user-styles', stylesRouter);

// schemas used for graphQL
const typeDefs = require('./graphQL/schema/typeDefs.js');
const { dirname } = require('node:path');

// instantiate Apollo server and attach to Express server, mounted at 'http://localhost:PORT/graphql'

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/graphql' });
/** ****************************************************************** */

// app.post(
//   '/signup',
//   userController.createUser,
//   cookieController.setSSIDCookie,
//   sessionController.startSession,
//   (req, res) => res.status(200).json({ sessionId: res.locals.ssid })
// );

// app.post(
//   '/login',
//   userController.verifyUser,
//   cookieController.setSSIDCookie,
//   sessionController.startSession,
//   (req, res) => res.status(200).json({ sessionId: res.locals.ssid })
// );

// // user must be logged in to get or save projects, otherwise they will be redirected to login page
// app.post(
//   '/saveProject',
//   sessionController.isLoggedIn,
//   projectController.saveProject,
//   (req, res) => res.status(200).json(res.locals.savedProject)
// );

// app.post(
//   '/getProjects',
//   sessionController.isLoggedIn,
//   projectController.getProjects,
//   (req, res) => res.status(200).json(res.locals.projects)
// );

// app.delete(
//   '/deleteProject',
//   sessionController.isLoggedIn,
//   projectController.deleteProject,
//   (req, res) => res.status(200).json(res.locals.deleted)
// );

// BRETT ADDED BELOW logs FOR TESTING 2/18/2023
console.log('process.env.GITHUB_ID =', process.env.GITHUB_ID)
console.log('process.env.GITHUB_SECRET =', process.env.GITHUB_SECRET)
console.log('process.env.URI =', process.env.URI)

//if in production mode, statically serve everything in the build folder on the route '/dist'
if (process.env.NODE_ENV == 'production'){
  app.use('/dist', express.static(path.join(__dirname, './dist')));

// serve index.html on the route '/'
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, './index.html'));
});
}

// app.get('/', function(req, res) {
//   res.send('Houston, Caret is in orbit!');
// });

// catch-all route handler
app.use('*', (req, res) => res.status(404).send('Page not found'));

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware',
    status: 500,
    message: { err: 'An error occurred' }
  };

  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

// starts server on PORT
if (isDev || isProd) {
  app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
}
if (isTest) module.exports = app;
