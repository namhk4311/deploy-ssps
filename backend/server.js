const express = require('express')
const mysql = require('mysql2');
const cors = require('cors')
const router = require('./routes');
const jwt = require('jsonwebtoken');
const PORT = 8081;


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "crud"
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO USER (`Name`, `Email`, `Password`) VALUES (?)";
    const values =  [
        req.body.name, 
        req.body.email,
        req.body.password
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error")
        }
        return res.json(data);
    })
})

const verifyJwt = (req, res, next) => {
    const token = req.headers["access-token"];
    if (!token) {
        return res.json("We need token please provide it for next time");
    }
    else {
        jwt.verify(token, "jwtSecretKey", (err, decoded) => {
            if (err) {
                res.json("Not authenticated");
            }
            else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

app.get('/checkauth', verifyJwt, (req, res) => {
    return res.json("Authenticated");
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM USER WHERE `Email` = ? AND `Password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) return res.json("Error");
        if (data.length > 0) {
            const id = data[0].id;
            const token = jwt.sign({id}, "jwtSecretKey", {expiresIn: 300})
            return res.json({Login: true, token, data});
        }
        else {
            return res.json("Fail");
        }
    })
})

app.get('/', (req, res) => {
    res.send({data: "Here is my data"});
})

app.use('/routes', router);





app.listen(PORT, () => {
    console.log("Listening");
})