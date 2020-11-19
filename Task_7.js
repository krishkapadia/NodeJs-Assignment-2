// Login, CRUD operations for students table with mongodb, express and frontend(html, css, javascript / jquery / angularjs), Logout.

// Username : admin
// Password : admin

const { urlencoded } = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
//var router = express.Router();
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

app.use(express.urlencoded({ extended: true }));
//router.use(express.static(__dirname + '/public'));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/views/index.html",{name : "Krishna"});
});

app.post("/", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;   
    tblLogin.findOne({ username: username, password: password }, (err, data) => {
        if (data == null)
        {
            //res.render("login", { success: "Invalid Username or Password", color: "Red" });
            res.sendFile(__dirname + "/views/index2.html");
        }            
        else
        {
            //res.render("login", { success: "Successfull Login", color: "Green" });
            res.sendFile(__dirname + "/views/index3.html");
        }
        console.log(data);
    }) 
    
});

app.listen(port,()=>{
    console.log("Server is running on port number : ",port);
});