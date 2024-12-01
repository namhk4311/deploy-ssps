const db = require('../database/db');
const { get } = require('../routes');

async function getStudentByID(id) {
    try {
        const sql = 'SELECT * FROM USER, STUDENT WHERE (USER.ID = STUDENT.ID) AND (USER.ID = ?)';
        const [result] = await db.query(sql, [id]);
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function getStudentByEmail(email) {
    try {
        const sql = `
            SELECT * 
            FROM USER, STUDENT 
            WHERE (USER.ID = STUDENT.ID) AND (USER.Email = ?)
        `;
        const [result] = await db.query(sql, [email]);
        return result[0];
    }
    catch (err) {
        throw err;
    }
}

async function updateLastLogin(id) {
    try {
        const sql = `
            UPDATE USER
            SET LastLogin = now()
            WHERE ID = ?
        `;
        const [result] = await db.query(sql, [id]);
        return result[0];
    } catch (err) {
        throw err;
    }
}

async function getBalance(id) {
    try {
        const sql = `
            SELECT Available_Pages
            FROM STUDENT
            WHERE ID = ?
        `;
        const [result] = await db.query(sql, [id]);
        return result[0].Available_Pages;
    }
    catch (err) {
        throw err;
    }
}

async function updateStudentBalance(id, num_pages) {
    try {
        const getCurrentBalance = await getBalance(id);
        const updateBalance = getCurrentBalance + num_pages;
        if (updateBalance <= 0) {
            console.log(updateBalance);
            return null;
        }
        const sql = `
            UPDATE STUDENT
            SET Available_Pages = ?
            WHERE ID = ?
        `;
        const result = await db.query(sql, [updateBalance, id]);
        return result;
    }
    catch (err) {
        console.log('my error')
        throw err;
    }
}

module.exports = {
    getStudentByID, 
    getStudentByEmail,
    getBalance,
    updateLastLogin,
    updateStudentBalance
}



// async function print() {
//     const result = await getStudentByID(2252500);//.then(res => {
//     console.log(result);
// }

// print();


// const result2 = getStudentByEmail('nam.hokhanhcs22@hcmut.edu.vn').then(res => {
//     if (res[0].length == 0) console.log('not found');
//     else console.log(res);
// })

// const result3 = updateLastLogin(2252500);

// const result4 = getBalance(2252500).then(
//     res => {
//         console.log(res);
//     }
// )

// const result5 = updateStudentBalance(2252500, -200);


// console.log(result);
