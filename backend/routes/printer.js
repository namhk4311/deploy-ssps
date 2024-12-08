const express = require('express');
const router = express.Router();
const printerController = require('../controllers/PrinterController');

router.use(express.json());

// router.get('/', (req, res) => {
//     res.send({data: 'Here is printer data'})
// })

router.get('/all', printerController.showAll);

router.post('/add', printerController.requestAdd);

router.get('/enable/:id', printerController.enable);

router.get('/disable/:id', printerController.disable);

router.get('/checkOnline/:id', printerController.checkOnline);

router.get('/delete/:id', printerController.requestDelete);

router.post('/update', printerController.updatePrinterInfo);

module.exports = router;