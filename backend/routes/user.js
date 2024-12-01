const express = require('express');
const router = express.Router();
const db = require('../database/db');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {getStudentByID, getStudentByEmail, getBalance, updateLastLogin, updateStudentBalance} = require('../models/student');

router.get("/", (req, res) => {
    res.send({data: "Here is user data"});
});

router.use(cookieParser());
router.use(express.json());


const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({Message: "we need token please provide it."})
    }
    else {
        jwt.verify(token, "jwtSecretKey", (err, decoded) => {
            if (err) {
                return res.json({Message: "Authentication Error"})
            }
            else {
                req.name = decoded.name;
                next();
            }
        }) 
    }
}

router.get('/', verifyUser, (req, res) => {
    return res.json({Status: "Success", name: req.name})
})


router.post('/login', async (req, res, next) => {
    const sql = "SELECT * FROM USER WHERE `Email` = ? AND `Password` = ?";
    try {
        const result = await db.query(sql, [req.body.email, req.body.password], (err, data) => {
            // if (err) return res.json("Error");
            // if (data.length > 0) {
            //     const id = data[0].id;
            //     jwt.sign({id}, "jwtSecretKey", {expiresIn: '1d'});
            //     res.cookie('token', token);
            //     mydata = data;
            // }
            // else {
            //     console.log('error')
            //     // return res.json({Message: "No records existed"});
            // }
        }).then((data) => {
            if (data.length > 0) {
                getresult = data;
                const id = data[0].ID;
                const token = jwt.sign({id}, "jwtSecretKey", {expiresIn: '1d'});
                res.cookie('token', token);
                return res.json({Login: true, token, data});
            }
            else {
                return res.json({Message: "No records existed"});
            }
        }).catch(err => console.log(err));
    }
    catch (err) {
        next(err);
    }
})


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    console.log('clear token');
    return res.json({Status: "Success"})
})


module.exports = router;