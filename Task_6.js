// 6) Login, CRUD operations for students table with mongodb, express and any one template engine, Logout.

// Username : admin
// Password : admin

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

const tblStudentSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    city: String
})


// Referencing Schema
const tblLogin = mongoose.model('tblLogin', tblLoginSchema);
const tblStudent = mongoose.model('tblStudent',tblStudentSchema);

// Set View Engine
app.set("view engine", "ejs");

// Url Encoder
app.use(express.urlencoded({ extended: true }));

// Get Method
app.get("/", (req, res) => {
    res.render("login", { success: null, color: null });
});

app.post("/", (req, res) => {
    var msg = null;
    var username = req.body.username;
    var password = req.body.password;
    tblLogin.findOne({ username: username, password: password }, (err, data) => {
        if (data == null)
            res.render("login", { success: "Invalid Username or Password", color: "Red" });
        else
            res.render("student", { success: "Successfull Login", color: "Green" });
    });

});

app.post("/student", (req, res) => {
    var msg = null;
    var name = req.body.name;
    var surname = req.body.surname;
    var email = req.body.email;
    var city = req.body.city;
    var demoObj = new tblStudent({
        name:name,
        surname:surname,
        email:email,
        city:city
    });
    demoObj.save((err, data) => {
        console.log(data);
    })
    res.redirect("/studentdata");
});

app.get("/student", (req, res) => {
    tblStudent.find((err, data) => {
        res.render("student", { data: data });
    });
})

app.get("/studentdata",(req,res)=>{
    tblStudent.find((err, data) => {
        res.render("student", { data: data });
    });   
})

app.post("/delete", (req, res) => {
    var id = req.query.id;
    var del = tblStudent.findByIdAndDelete(id)
    del.exec((err,data)=>{
        res.redirect("/studentdata");
    })
    
});

app.post("/updateData", (req, res) => {
    var id = req.query.id;
    tblStudent.find({ _id: id }, (err, data1) => {
        if (!err) {
            tblStudent.find((err, data) => {
                if (!err) {
                    res.render("updateView.ejs", { data: data, params: data1 });
                }
            })
        }
    });
});

app.post("/update", (req, res) => {
    var id = req.query.id;
    tblStudent.findOneAndUpdate({_id:id}, { name: req.body.name, surname: req.body.surname, city: req.body.city, email: req.body.email }, (err, data1) => {
        if (!err) {
            res.redirect("/studentdata");
        }
    });
})

app.listen(port, () => {
    console.log("Server is running on port number : ", port);
});