// Image Upload With Validation
const express = require('express');
const multer = require('multer');
var bodyParser = require('body-parser');
const path = require('path');
var upload = multer({ dest: 'uploads/' })
const app = express();
const port = 8080;
var router = express.Router();

router.use(express.static(__dirname+'/public'));


var Storage = multer.diskStorage({    
    destination: function (req, file, cb) {
        if (file.mimetype !== 'image/jpeg') {
            return cb('Invalid file format'); //cb(err)
        }
        cb(null, './public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
});

var upload = multer({
    storage:Storage 
}).single('file');

app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.render("file-upload");
});

app.post("/", upload,(req,res)=>{
    console.log(req.file.filename);
    res.render("file-upload");
})

app.listen(port,()=>{
    console.log("Server is runningon port number:",port);
})