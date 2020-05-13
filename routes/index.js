const express = require('express')
const router = express.Router()
const request = require('request')

const cheerio = require('cheerio');

router.get('/', (req, res) => {
    request.get("https://www.worldometers.info/coronavirus/", (err, response, body) => {
        var $ = cheerio.load(body);
        var results = [];

        $("div.content-inner").each(function (i, element) {
            var totalCases = $(element).children().eq(6).children().eq(1).text()
            var totalDeaths = $(element).children().eq(8).children().eq(1).text()
            var totalRecovered = $(element).children().eq(9).children().eq(1).text()
            var activeCases = $(element).children().eq(13).children().children().eq(1).children().children().eq(0).children().eq(0).text()

            //active cases
            var activeCases = $(element).children().eq(13).children().children().eq(1).children().children().eq(0).children().eq(0).text()
            var mildCondition = $(element).children().eq(13).children().children().eq(1).children().children().eq(0).children().eq(2).children().eq(0).children().eq(0).text()
            var mildConditionPer = $(element).children().eq(13).children().children().eq(1).children().children().eq(0).children().eq(2).children().eq(0).children().eq(1).text()
            var criticalCondition = $(element).children().eq(13).children().children().eq(1).children().children().eq(0).children().eq(2).children().eq(1).children().eq(0).text()
            var criticalConditionPer = $(element).children().eq(13).children().children().eq(1).children().children().eq(0).children().eq(2).children().eq(1).children().eq(1).text()

            //closed  cases

            var closedCases = $(element).children().eq(14).children().children().eq(1).children().children().eq(0).children().eq(0).text()
            var recoveredCasesPer = $(element).children().eq(14).children().children().eq(1).children().children().eq(0).children().eq(2).children().eq(0).children().eq(1).text()
            var deathPer = $(element).children().eq(14).children().children().eq(1).children().children().eq(0).children().eq(2).children().eq(1).children().eq(1).text()



            results.push({
                totalCases:totalCases,
                totalDeaths:totalDeaths,
                totalRecovered:totalRecovered,

                activeCases:activeCases,
                mildCondition:mildCondition,
                mildConditionPer:mildConditionPer,
                criticalCondition:criticalCondition,
                criticalConditionPer:criticalConditionPer,

                closedCases:closedCases,
                recoveredCasesPer:recoveredCasesPer,
                deathPer:deathPer,
            })
        })
        console.log(results);
        res.render("index", { results: results });
        
    })
})

module.exports = router
