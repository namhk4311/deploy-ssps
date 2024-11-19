const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send({data: "Here is user data"});
});

module.exports = router