const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.use(express.json());


// router.get('/', (req, res) => {
//     res.send({data: 'Here is student data'})
// })

router.get('/info/:id', userController.getStudentInfo);


module.exports = router;