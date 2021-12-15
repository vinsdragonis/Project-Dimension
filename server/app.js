import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import ls from 'passport-local';
import mongoose from 'mongoose';

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGODB_URI)
  .catch((err) => { console.log(err); });

app.use(session({
  secret: 'mysecretisthisrandomstringofletters',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.listen(3001, function() {
  console.log("Server started on port 3001");
});