const express = require('express');
const router = express.Router();
const db = require('../database/db');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/UserController');


// router.get("/", (req, res) => {
//     res.send({data: "Here is user data"});
// });

// router.use(cookieParser());
router.use(express.json());




router.get('/', userController.verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name})
})

// router.post('/login', async (req, res, next) => {
//     const sql = "SELECT * FROM USER WHERE `Email` = ? AND `Password` = ?";
//     try {
//         // const result = await db.query(sql, [req.body.email, req.body.password]).then((data) => {
//         //     if (data.length > 0) {
//         //         const id = data[0].ID;
//         //         const token = jwt.sign({id}, "jwtSecretKey", {expiresIn: '1d'});
//         //         res.cookie('token', token);
//         //         return res.json({Login: true, token, data});
//         //     }
//         //     else {
//         //         return res.json({Message: "No records existed"});
//         //     }
//         // }).catch(err => console.log(err));
//         const result = await getStudentByEmail(req.body.email, req.body.password);
//         if (result.length > 0) {
//             const id = result[0].ID;
//             const token = jwt.sign({id}, "jwtSecretKey", {expiresIn: '1d'});
//             res.cookie('token', token);
//             await updateLastLogin(id);
//             return res.json({Login: true, token, result});
//         }
        
//             return res.json({Message: "No records existed"});
//     }
//     catch (err) {
//         next(err);
//     }
// })

router.post('/login/student', userController.loginStudent);
router.post('/login/spso', userController.loginSPSO);


router.get('/logout', userController.logoutUser);


module.exports = router;