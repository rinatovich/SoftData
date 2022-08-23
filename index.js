let express = require('express');
let bodyParser = require("body-parser");
let path = require("path");
let cors = require("cors");
let nodemailer = require("nodemailer");
// const PORT = process.env.PORT || 8000;
// const HOST = '127.0.0.1';
const _dirname = path.resolve();
const APP = express();


const response = (status,values,res)=>{

    const data = {
        "status": status,
        "values": values
    }
    res.status(data.status);
    res.json(data);
    res.end();
}
let mail = nodemailer.createTransport({
    host: 'server3.ahost.uz',
    port: 465,
    secure: true,
    auth: {
        user: 'info@softdata.uz',
        pass: 'Master7224609'
    }
});


APP.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
APP.use(cors()) // Use this after the variable declaration
APP.use(bodyParser.urlencoded({extended: true}));
APP.use(bodyParser.json());
APP.use(express.static(path.resolve(_dirname, 'static')));



APP.set('view_engine', 'ejs');
APP.set('views', path.resolve(__dirname,'templates'));

const home = (req,res)=>{
    res.render('main.ejs');
}
const mailController = (req,res)=>{
    let mailOptions = {
        from: 'info@softdata.uz',
        to: 'mvrinatovicso@gmail.com',
        subject: req.body.title,
        text: `${req.body.message} \n ${req.body.name}:${req.body.phone} `
    };
    mail.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            response(300,error, res);
        } else {
            console.log('Email sent: ' + info.response);
            response(200,info.response ,res);
        }
    });
}


APP.route('/').get(home);
APP.route('/sendmail').post(mailController);

const server = APP.listen(8080, '127.0.0.1',()=>{
    console.log(`App listen on port`);
})
