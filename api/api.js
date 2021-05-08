const express = require('express');
const auth = require("./auth");

const router = express.Router();

router.use("/auth", auth);


router.get('/', async (req, res) => {
    try {
        res.render('index');
    } catch (err) {
        res.status(500).send({ msg: err.message })
    }
})

module.exports = router;
