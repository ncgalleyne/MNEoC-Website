const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: true}));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mailing list route
app.post('/signup', (req, res) => {
    const {firstName, lastName, email} = req.body;
    if(!firstName || !lastName || !email)
        console.log('invalid request');

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const postData = JSON.stringify(data);
    //make a request to mailchimp
    const options = {
        url: 'https://us14.api.mailchimp.com/3.0/lists/',
        method: 'POST',
        headers: {
            Authorization: ''// api key
        },
        body: postData
    }
    request(options, (err, response, body) => {
        if(err)
            console.log('error dh')
        else{
            if(response.statusCode === 200)
                console.log('200');
            else
                console.log('boo');
        }
    })
});

app.listen(PORT, console.log(`Server started on ${PORT}`));