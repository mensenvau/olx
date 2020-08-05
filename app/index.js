const express = require('express');
const router = express.Router();
const path = require('path');
const session = require("node-sessionstorage");
const request = require('request');
const text = require("./text ");

let jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

let $ = require('jquery')(window);

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/html/form.html'));

})


router.post("/", (req, res) => {

    request.get(req.body.url, function(error, response, body) {

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write(text, "utf-8");

        $("body").html(body);

        let all = $('.linkWithHash').map(function() {
            return ($(this).attr('href'));
        }).get();

        for (let i = 0; i < all.length; i = i + 2) {
            request.get(all[i], function(error, response, body) {
                $("body").html(body);
                let ProImg = $(".bigImage").attr("src");
                let ProName = $(".offer-titlebox>h1").text();
                let ProDsc = $("#textContent").text();
                // let Pronumber = $(".ccontact-a").html();
                // let ProId = $(".offer-bottombar__item:nth-child(2) span").text();
                let ProAutor = $(".quickcontact__user-name").text();
                let ProAutorLink = $(".button-email").attr("href");
                let ProCost = $(".pricelabel__value").text();
                let ProAdress = $(".offer-user__address>address").text();

                let text = `📌*Nomi:* ${ProName}\n📝*Tarifi:*${ProDsc.substring(0, 150)}...\n💵*Narxi:*${ProCost}\n🔎*Manzil:* ${ProAdress}\n✏️*Egasi:* ` + ProAutor;

                session.setItem(i + "text", text);
                session.setItem(i + "img", ProImg);
                session.setItem(i + "Link", ProAutorLink);

                TLink = "tel/" + i + "/" + req.body.user;

                let k = `
     <div class="card" style="width: 18rem; margin-top: 10px; margin-bottom: 10px ">
    <img src="${ProImg}" class="card-img-top" style="object-fit: contain; height: auto; " alt="Rasmi yo'q .... ">
    <div class="card-body">
    <h5 class="card-title">${ProName}</h5>
    <p class="card-title" >Tarifi: ${ProDsc.substring(0,150)} ... </p>
    <p class="card-title" >Narxi:  ${ProCost}</p>
    <p class="card-title" >Manzili: ${ProAdress}</p>
    <p class="card-title" >Mualifi: ${ProAutor}</p>
    <a href="${ProAutorLink}" class="btn btn-primary">Mualif bilan aloqa .</a>
    <a href="${TLink}" class='btn btn-outline-primary' target='_blank'>Telegram Yuborish</a></div></div>`
                res.write(k, "utf-8");
            })
        }
    })
})

module.exports = router;