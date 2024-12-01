const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({data: 'Here is student data'})
})



module.exports = router;