const dotenv = require("dotenv");
dotenv.config();

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')


const indexRouter = require('./routes/index')
const countryRouter = require('./routes/country')
const symptomRouter = require('./routes/symptoms')

const bodyParser = require('body-parser');

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(bodyParser());
app.use(express.static('public'))



app.use('/', indexRouter)
app.use('/countries', countryRouter)
app.use('/symptoms', symptomRouter)

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});