const express = require("express");
const app = express();
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const userRoute = require("./routes/userRoute");
const productRoute = require('./routes/productRoute');
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/user");
const store = new MongoDBStore({
    uri: process.env.DB_URL,
    collection: 'sessions'
});

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(
    session({
        secret:'my secret key should be a long string', 
        saveUninitialized: false, 
        resave: false,
        store: store
    })
);

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(error => console.log(error));
});
app.use("/user", 
(req, res, next)=>{ // getting session test code
    const isLoggedIn = req.session.isLoggedIn;
    console.log("isLoggedIn from session :",isLoggedIn)
    next();
},
 userRoute);
app.use("/product", productRoute);

module.exports = app;
