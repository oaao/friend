# friend
Facebook Messenger chatbot using node.js + dialogflow. Learning project from reference.

## setup

* Configure `.env` settings (port, FB auth strings, etc.). You will need to set up lcoal `.key` and `.crt` self-signed certificate files.

* Install `ngrok` via preferred package manager and run it with the same `{port}` number as declared in `.env`:

```shell
$ ngrok http 5000
```

* Note the forwarding url `https://{}.ngrok.io`; you will need it when setting up the app Facebook-side.

* Create a [Facebook page](https://www.facebook.com/pages/create) for your bot.

* Create a [Facebook app](developers.facebook.com/quickstarts) and proceed to its dashboard. Add the `Messenger` product via the `Products ⊕` sidebar element, and configure as follows:
    + `Access Tokens:`
        - add/link the `Page` you made for the bot to generate an Access Token
        - add the generated token to your `{env.FB_TOKEN}`
    + `Webhooks:`
        - the callback URL is your `https://{}.ngrok.io/webhook`
        - the Verify Token is the `{env.FB_STRING}` you chose
        - add a single subscription to `messages`


## references

* Tomomi Imura (2017): [Facebook Chat Bot Demo](https://github.com/girliemac/fb-apiai-bot-demo/tree/tutorial-01)
