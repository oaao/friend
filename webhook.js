const express    = require('express');
const bodyparser = require('body-parser');

const app        = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

// load env vars
const config = require('dotenv').config()
if (config.error) {
    throw config.error
}
console.log(config.parsed)

// initialize server
const port   = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(
        'Express server listening on port %d in %s mode',
        server.address().port, app.settings.env
    );
});

/* HTTP GET
used for facebook configuration */
app.get('/webhook', (req, resp) => {
    // facebook validation
    if (req.query['hub.mode'] && req.query['hub.verify_token'] === process.env.FB_STRING) {
        resp.status(200).send(req.query['hub.challenge']);
    } else {
        resp.status(403).end();
    }
});

/* HTTP POST
used for receiving message requests */
app.post('/webhook', (req, resp) => {

    console.log(req.body);

    if (req.body.object === 'page') {

        req.body.entry.forEach((entry) => {
            entry.messaging.forEach((event) => {
                if (event.message && event.message.text) {
                    sendMessage(event);
                }
            });
        });

        resp.status(200).end();
    }

});



const request = require('request');

function sendMessage(event) {
    let sender = event.sender.id;
    let text   = event.message.text;

    request({
        url:    'https://graph.facebook.com/v4.0/me/messages',
        qs:     {access_token: process.env.FB_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message:   {text: text}
        }
    }, function (error, response) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });

}