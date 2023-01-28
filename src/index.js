const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const router = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// connect to database
mongoose.connect(process.env.MONGODB_URL);


app.use(cors());
app.use(express.json());
app.get( '/', (req, res) => res.end('Voting app api by liam..'));
app.use(router);

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})