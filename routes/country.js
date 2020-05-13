const express = require('express')
const router = express.Router()
const request = require('request')

const cheerio = require('cheerio');


router.get("/", (req, res) => {
    request.get("https://www.worldometers.info/coronavirus/", function (err, response, body) {
        var $ = cheerio.load(body);
        var result = [];
        $("a.mt_a").each(function (i, element) {
            var countryName = $(element).text();
            var countryCases = $(element).parents().children().eq(2).text();
            var countryNewCases = $(element).parents().children().eq(3).text();
            var countryDeath = $(element).parents().children().eq(4).text();
            var countryNewDeath = $(element).parents().children().eq(5).text();
            var countryRecovered = $(element).parents().children().eq(6).text();
            var countryActiveCases = $(element).parents().children().eq(7).text();
            var countryCriticalCases = $(element).parents().children().eq(8).text();
            var countryTestDone = $(element).parents().children().eq(11).text();

            result.push({
                countryName: countryName,
                countryCases: countryCases,
                countryNewCases: countryNewCases,
                countryDeath: countryDeath,
                countryNewDeath: countryNewDeath,
                countryRecovered: countryRecovered,
                countryActiveCases: countryActiveCases,
                countryCriticalCases: countryCriticalCases,
                countryTestDone: countryTestDone,

            })
            return results;
        })

        var results = result.splice(0,211);
        res.render("country/index", { results: results });
    });
});

module.exports = router