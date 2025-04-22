const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');

//load env
dotenv.config({ path: './config.env'})

const app = express();

app.use(cors());
app.use(express.json())

// Dev logging
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Profile routes
app.use('/api/v1/profile', require('./routes/profile'));
app.use('/api/v1/history', require('./routes/history'));
app.use('/api/v1/matchDetail', require('./routes/matchDetail'));
app.use('/api/v1/rating', require('./routes/rating'))

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(` Server runiing in ${process.env.NODE_ENV} mode on port ${port}`);
});
