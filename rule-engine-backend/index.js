const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const rulesRouter = require('./routes/rules');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/rules', rulesRouter);

mongoose.connect('mongodb://localhost:27017/ruleengine', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
    .catch(err => console.error(err));
