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

        req.status(200).end();
    }

});
