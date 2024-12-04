const express = require('express');
const router = express.Router();
const printerController = require('../controllers/PrinterController');

router.use(express.json());

// router.get('/', (req, res) => {
//     res.send({data: 'Here is printer data'})
// })

router.get('/all', printerController.showAll);

router.post('/add', printerController.requestAdd);

router.put('/enable/:id', printerController.enable);

router.put('/disable/:id', printerController.disable);


module.exports = router;