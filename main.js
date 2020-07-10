const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = require('./routes/index');

app.set('port', process.env.PORT || 3002);

mongoose.Promise = global.Promise;
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/picsart-api",
    { useNewUrlParser: true }
);

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


app.use('/', router);

const server = app.listen(app.get('port'), () => {
    console.log(`The server is running at port: ${app.get('port')}`);
})