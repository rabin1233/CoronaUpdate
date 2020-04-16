const express = require("express");
const app = express();

app.set("view engine", "ejs");

const bodyParser = require("body-parser");
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

const cheerio = require("cheerio");

const mongojs = require("mongojs");

const databaseUrl = "corona";
const collections = ["coronaData"];

const request = require("request");

const db = mongojs(databaseUrl, collections);


db.on("error", function (error) {
    console.log("Database Error:", error);
});

function updateDb(title, link, content, image) {
    db.coronaData.update(
        {Country: country},
        {$set: {
            Country:country,
            TotalCases:totalCases,
            TotalNewCases:totalNewCases,
            TotalDeath:totalDeath,
            TotalRecovered:totalRecovered,
            TotalActiveCases:totalActiveCases,
            TotalCriticalCases:totalCriticalCases,
            TotalTestDone:totalTestDone,
        }}
    );
};


// app.post("/deleteComment", function (req, res) {
//     let comment = req.body.comment;
//     let id = req.body.id;
//     db.scrapedData.update({ "_id": mongojs.ObjectID(id) }, { $pull: { Comments: comment } }, function (error, result) {
//         if (error) {
//             console.log(error);
//         } else {
//             res.redirect("/savedArticles");
//         }
//     });
// });

// app.post("/deleteArticle", function(req,res){
//     let id = req.body.id;
//     db.scrapedData.remove({_id: mongojs.ObjectID(id)}, function(error, result){
//         if (error){
//             console.log(error);
//         } else {
//             res.redirect("/savedArticles");
//         }
//     });
// })

// app.post("/saveArticle", function (req, res) {
//     var image = req.body.image;
//     var title = req.body.title;
//     var link = req.body.link;
//     var content = req.body.content;
//     updateDb(title, link, content, image);
// });

// app.get("/savedArticles", function (req, res) {
//     db.scrapedData.find(function (error, result) {
//         res.render("savedArticles", { results: result });
//     });
// });

// app.post("/addComment", function (req, res) {
//     var id = req.body.id;
//     var comment = req.body.newComment;
//     db.scrapedData.update({ "_id": mongojs.ObjectID(id) }, { $push: { Comments: comment } }, function (error, response) {
//         if (error) {
//             console.log(error)
//         }
//     });
//     res.redirect("/savedArticles");
// });

// Main route (simple Hello World Message)
app.get("/", function (req, res) {
    request.get("https://www.worldometers.info/coronavirus/", function (err, response, body) {
        var $ = cheerio.load(body);
        var results = [];
        $("a.mt_a").each(function (i, element) {
            var country = $(element).text();
            var totalCases = $(element).parents().children().eq(2).text();
            var totalNewCases = $(element).parents().children().eq(3).text();
            var totalDeath = $(element).parents().children().eq(4).text();
            var totalNewDeath = $(element).parents().children().eq(5).text();
            var totalRecovered = $(element).parents().children().eq(6).text();
            var totalActiveCases = $(element).parents().children().eq(7).text();
            var totalCriticalCases = $(element).parents().children().eq(8).text();
            var totalTestDone = $(element).parents().children().eq(11).text();
            results.push({
                Country: country,
                TotalCases: totalCases,
                TotalNewCases: totalNewCases,
                TotalDeath: totalDeath,
                TotalRecovered: totalRecovered,
                TotalActiveCases: totalActiveCases,
                TotalCriticalCases: totalCriticalCases,
                TotalTestDone: totalTestDone,
            })
        })

        res.render("index", { results: results });
    });
});

app.listen("3000", function () {
    console.log("Server running on 3000");
});