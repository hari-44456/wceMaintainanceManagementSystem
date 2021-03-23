const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => console.log('connected to db...')
);

app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.cookie('auth-token', 'Cookie Token', { httpOnly: true, secure: true });
  res.status(200).json({
    success: 1,
    message: 'Hello from MERN',
  });
});

app.use('/api/login', require('./login'));

app.listen(process.env.PORT, () =>
  console.log(`Listening to PORT ${process.env.PORT}...`)
);
