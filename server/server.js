require('dotenv').config();

const express = require('express');
const session = require('express-session')
const path = require('path');
const PORT = process.env.PORT || 3001;
const db = require('./config/connection');

const api_routes = require('./routes/api_routes')
const auth_routes = require('./routes/auth_routes')


const app = express();
app.use(express.json())

app.use(express.static('../client/build'));
app.set('trust proxy', 1)
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: (process.env.NODE_ENV && process.env.NODE_ENV == 'production') ? true:false
    }
    // cookie: {secure: process.env.PORT ? true : false }
  }))

app.use('/api', api_routes)
app.use('/auth', auth_routes)

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

db.once('open', () => {
app.listen(PORT, () => console.log('server started on port %s', PORT))
});