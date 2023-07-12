const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
// toastr & toastr dependencies
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const toastr = require('express-toastr');

//mailchip vars
const _MAILCHIMP = require("@mailchimp/mailchimp_marketing");
const MAILCHIMP_LIST_ID = "83948f8cc5";
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
app.post('/signup', async (req, res) => {
    const {fname, lname, email} = req.body;

    _MAILCHIMP.setConfig({
        apiKey: MAILCHIMP_API_KEY,
        server: MAILCHIMP_SERVER,
      });

    const response = await _MAILCHIMP.lists.addListMember(MAILCHIMP_LIST_ID, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: fname,
            LNAME: lname
        },
    });

    if(response){
        res.send('You have been subscribed.');
        return;
    }
    res.status(500).send('bad request');
});

app.get('/members', async (req, res) => {
    _MAILCHIMP.setConfig({
        apiKey: MAILCHIMP_API_KEY,
        server: MAILCHIMP_SERVER,
      });
    const response = await _MAILCHIMP.lists.getListMembersInfo(MAILCHIMP_LIST_ID);
    if(response){
        res.send(response);
        return;
    }
    res.status(500).send('bad request');
});

app.get('/health', async (req, res) => {
    _MAILCHIMP.setConfig({
        apiKey: MAILCHIMP_API_KEY,
        server: MAILCHIMP_SERVER,
      });
    const response = await _MAILCHIMP.ping.get();
    res.send(response)
})

app.get('/slideshow', async (req, res) => {
    res.send( fs.readdirSync('public/img/slideshow'));
})

app.listen(PORT, console.log(`Server started on ${PORT}`));
console.log("environment set to ",process.env.NODE_ENV);