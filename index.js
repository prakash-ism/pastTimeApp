const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('./models/Users');

mongoose.connect('mongodb://127.0.0.1:27017/Users');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))


require('./routes/registerRoutes')(app);
require('./routes/loginRoutes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Listening on port " + PORT));