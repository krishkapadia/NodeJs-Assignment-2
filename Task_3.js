// Session Login
const express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const app = express();
const port = 8080;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("login", { success: null, color: null });
});

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'keyboard cat'
}));

app.post("/", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    if (username == "admin" && password == "admin") {
        
        req.session.uname = username;
        res.render("login_success", { success: "Login Successfull...", color: "Green" });
    }
    else {
        res.render("login", { success: "Invalid Username or Password", color: "Red" });
    }

});

app.listen(port);