const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const studentDAO = require('../models/student');
const spsoDAO = require('../models/spso');



async function loginStudent(req, res, next) {
    try {
        const result = await studentDAO.getStudentByEmail(req.body.email, req.body.password);
        if (result.length > 0) {
            const id = result[0].ID;
            const token = jwt.sign({id}, "jwtSecretKey", {expiresIn: '1d'});
            res.cookie('token', token);
            await studentDAO.updateLastLogin(id);
            return res.json({Login: true, token, result});
        }
        return res.json({Message: "No records existed"});
    }
    catch (err) {
        next(err);
    }
}

async function loginSPSO(req, res, next) {
    try {
        const result = await spsoDAO.getSPSOByEmail(req.body.email, req.body.password);
        if (result.length > 0) {
            const id = result[0].ID;
            const token = jwt.sign({id}, "jwtSecretKey", {expiresIn: '1d'});
            res.cookie('token', token);
            await spsoDAO.updateLastLoginSPSO(id);
            return res.json({Login: true, token, result});
        }
        return res.json({Message: "No records existed"});
    }
    catch (err) {
        next(err);
    }   
}

async function getStudentInfo(req, res, next) {
    try {
        const result = await studentDAO.getStudentByID(req.params.id);
        if (result.length > 0) return res.json(result[0]);
        else return res.json({Message: "fetch student info Failed"})
    }
    catch(err) {
        next(err);
    }
}

async function getSPSOInfo(req, res, next) {
    try {
        const result = await spsoDAO.getSPSOByID(req.params.id);
        if (result.length > 0) return res.json(result[0]);
        else return res.json({Message: "fetch spso info Failed"})
    }
    catch(err) {
        next(err);
    }
}

function logoutUser(req, res) {
    res.clearCookie('token');
    console.log('clear token');
    return res.json({Status: "Success"});
}

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

async function getStudentBalance(req, res, next) {
    try {
        const result = studentDAO.getBalance(req.params.id);
        if (result) return res.json(result);
        return res.json({Message: "Fetch student balance failed"});
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    loginStudent,
    loginSPSO,
    getStudentInfo,
    getSPSOInfo,
    logoutUser,
    verifyUser,
    getStudentBalance
}
