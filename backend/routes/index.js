const express = require('express');
const router = express.Router();
const user = require('./user');
const student = require('./student')
const spso = require('./spso')
const printer = require('./printer')

router.use('/user', user);
router.use('/student', student);
router.use('/spso', spso);
router.use('/printer', printer);
// router.use('/');

// router.get('/', (req, res) => {
//     res.send({data: 'here is routes data'})
// })
module.exports = router;