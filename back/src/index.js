const express = require('express');

const bodyParser = require('body-parser');
const ConnectyCube = require('connectycube');
const session = require('express-session')


const app = express();

app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000
  }
}));

const CREDENTIALS = {
  appId: 648,
  authKey: 'JMeeaOMgT4KBwe6',
  authSecret: 'saFDJkqOSxTbkHz'
};
ConnectyCube.init(CREDENTIALS);
const CONFIG = {
  debug: {
    mode: 1
  } // enable DEBUG mode (mode 0 is logs off, mode 1 -> console.log())
};
ConnectyCube.init(CREDENTIALS, CONFIG);

const userCredentials = {
  login: 'joker_1616',
  password: '1qaz2wsx'
};

ConnectyCube.createSession(userCredentials, (error, session) => {});

const pasr = bodyParser.urlencoded({
  extended: false
});
// parse application/json
app.use(bodyParser.json());
const corsMiddleware = require('cors');

app.use(corsMiddleware());
// app.use(express.cookieParser)
app.get('/', (req, res, next) => {

});

app.post('/register', pasr, (req, res) => {
  if (!req.body) return res.sendStatus(400);
  ConnectyCube.users.signup(req.body, (error, user) => {
    if (error === '') {
      res.send(user);
    } else {
      res.send(error);

    }
  });
});
app.post('/login', pasr, (req, res) => {
  const userCredentials = {
    login: req.body.login,
    password: req.body.password
  };
  ConnectyCube.login(userCredentials, (errorl, user) => {
    if (!errorl) {

      ConnectyCube.createSession(user, (error, session) => {
        res.send(user);


      });

    } else {
      res.send(errorl);
    }


  });
});

app.post('/logout', (req, res) => {
  ConnectyCube.logout((error) => {
    res.send(error);
  });
});
app.post('/load', (req, res) => {
  ConnectyCube.login((error, user) => {
    console.log(user);
  });
});


// 404 middleware
// app.use((req, res) => {
//   res.status(404).send('Not found');
// });

// 500 middleware
// app.use((err, req, res) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

app.listen(3000, () => {
  console.log('example app, listing on port 3000!');
});
