const express = require("express");
const app = express();

const userRoute = require("./routes/userRoute");
const productRoute = require('./routes/productRoute');
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/user");

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(error => console.log(error));
});
app.use("/user", 
(req, res, next)=>{ // getting cookie test code
    const isLoggedIn = req.get('Cookie').split('=')[1];
    console.log("isLoggedIn",isLoggedIn)
    next();
},
 userRoute);
app.use("/product", productRoute);

module.exports = app;
