const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const verify = require('./verifyAuthToken');

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

app.get('/api/isAuthenticated', verify, (req, res) => {
  try {
    return res.status(200).json({
      success: 1,
    });
  } catch (error) {
    return res.status(403).json({
      success: 0,
    });
  }
});

app.use('/api/login', require('./login'));
app.use('/api/complaint', require('./complaint'));
app.use('/api/store',require('./store'));
app.listen(process.env.PORT, () =>
  console.log(`Listening to PORT ${process.env.PORT}...`)
);
