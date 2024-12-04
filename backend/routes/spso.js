const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.use(express.json());

// router.get('/', (req, res) => {
//     res.send({data: 'Here is spso data'})
// })

router.get('/info/:id', userController.getSPSOInfo);

module.exports = router;