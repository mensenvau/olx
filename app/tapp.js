const request = require('request');
const express = require("express");
const session = require("node-sessionstorage");
const app = express.Router();

var TelegramBot = require('node-telegram-bot-api');

// Устанавливаем токен, который выдавал нам бот.
var token = '957791654:AAHwiTXXik2e8YMsjw_V5dc8XwBLtDz-xvU';

// Включить опрос сервера
var bot = new TelegramBot(token, { polling: false });

app.get("/:id/:user", (req, res) => {

    let text = session.getItem(req.params.id + "text", );
    let img = session.getItem(req.params.id + "img", );
    let Link = session.getItem(req.params.id + "Link", );


    const oldstring = "\"";
    while (text.indexOf(oldstring) > -1) {
        text = text.replace(oldstring, "");
    }

    while (text.indexOf("  ") !== -1) {
        text = text.replace(/  /g, " ");
    }

    res.send("Hi!. I sent the message<script> window.close(); </script>")


    // request.get("https://api.telegram.org/bot957791654:AAHwiTXXik2e8YMsjw_V5dc8XwBLtDz-xvU/sendPhoto?chat_id=" + req.params.user + "&photo=" + img + "&caption=" + encodeURI(text) + "&parse_mode=markdown&reply_markup={'inline_keyboard':[[{'text':'Aloqa','url':'button1'}]]}",
    //     function(error, response, body) {

    //         console.log("https://api.telegram.org/bot957791654:AAHwiTXXik2e8YMsjw_V5dc8XwBLtDz-xvU/sendPhoto?chat_id=" + req.params.user + "&photo=" + img + "&caption=" + encodeURI(text) + "&parse_mode=markdown&reply_markup={'inline_keyboard':[[{'text':'кнопка1','url':'button1'}]]}")

    //     });
    key = JSON.stringify({
        inline_keyboard: [
            [{ text: 'Aloqa 📞', url: Link }]
        ]
    })

    bot.sendPhoto(req.params.user, img, { caption: text, parse_mode: "markdown", reply_markup: key })
})

module.exports = app;