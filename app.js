const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
// toastr & toastr dependencies
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const toastr = require('express-toastr');

//mailchip vars
const _MAILCHIMP = require("@mailchimp/mailchimp_marketing");
const MAILCHIMP_SERVER = "us21";

//set environment variables
const { config } = require('dotenv');
const isProduction = process.env.NODE_ENV === 'prod';
config({
    path: isProduction ? '.env.production' : '.env.dev',
});
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;

const app = express();
const PORT = process.env.PORT || 5000;

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: true}));

// toastr
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(toastr({
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "3000",
    "hideDuration": "1000",
    "timeOut": "2500",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mailing list route
// calls to this endpoint subscribe members
app.post('/signup', (req, res) => {
    const {fname, lname, email} = req.body;
    if(!fname || !lname || !email)
        console.log('invalid request');

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }
    const postData = JSON.stringify(data);
    //make a request to mailchimp
    const options = {
        url: 'https://us21.api.mailchimp.com/3.0/lists/83948f8cc5',
        method: 'POST',
        headers: {
            Authorization: 'auth ' + MAILCHIMP_API_KEY
        },
        body: postData
    }
    request(options, (err, response, body) => {
        console.log(response.statusCode)
        if(err)
            console.log('error dh')
        else{
            if(response.statusCode === 200){
                //toastr
                req.toastr.success('Thank you, you have been successfully subscribed', "Success");
                //clear form
                res.end();
            }
            else
                res.end();
        }
    })
});

app.get('/health', async (req, res) => {
    _MAILCHIMP.setConfig({
        apiKey: MAILCHIMP_API_KEY,
        server: MAILCHIMP_SERVER,
      });
    const response = await _MAILCHIMP.ping.get();
    res.status(200).send(response)
})

app.listen(PORT, console.log(`Server started on ${PORT}`));
console.log("environment set to ",process.env.NODE_ENV)