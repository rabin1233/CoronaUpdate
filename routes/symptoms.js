const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render("symptoms/index")
})

module.exports = router