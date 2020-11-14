// 6) Login, CRUD operations for students table with mongodb, express and any one template engine, Logout.

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 8080;

// MongoDb Connection
mongoose.connect('mongodb://localhost/DemoDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Connect With Database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database Connection Successful.");
});

// Creating Schema
const tblLoginSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Referencing Schema
const tblLogin = mongoose.model('tblLogin', tblLoginSchema);

// Inserting Demo record for login
// var tmp = new tblLogin({
//     username : "admin",
//     password:"admin"
// });

// tmp.save((err,data)=>{
//     console.log("Insert Successfull");
// })

// Set View Engine
app.set("view engine", "ejs");

// Url Encoder
app.use(express.urlencoded({ extended: true }));

// Get Method
app.get("/", (req, res) => {
    res.render("login", { success: null, color: null});
});

app.post("/", (req, res) => {
    var msg = null;
    var username = req.body.username;
    var password = req.body.password;
    tblLogin.findOne({ username: username, password: password }, (err, data) => {
        if (data == null)
            res.render("login", { success: "Invalid Username or Password" , color : "Red"});
        else
            res.render("login", { success: "Successfull Login", color: "Green"});
    })
    
})

app.listen(port, () => {
    console.log("Server is running on port number : ", port);
})