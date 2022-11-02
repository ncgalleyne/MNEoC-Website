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
            Authorization: 'auth 832d7c040cd33afe810ee9e2cfdeb04d-us21'// api key
        },
        body: postData
    }
    request(options, (err, response, body) => {
        if(err)
            console.log('error dh')
        else{
            if(response.statusCode === 200)
                res.send('OK');
            else
                res.end();
        }
    })
});

app.listen(PORT, console.log(`Server started on ${PORT}`));