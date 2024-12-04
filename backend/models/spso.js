const db = require('../database/db');

async function getSPSOByID(id) {
    try {
        const sql = `
            SELECT U.ID, U.Email, U.F_Name, U.M_Name, U.L_Name, U.LastLogin, U.Role
            FROM USER U, SPSO S 
            WHERE (U.ID = S.ID) AND (U.ID = ?);`;
        const [result] = await db.query(sql, [id]);
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function getSPSOByEmail(email, password) {
    try {
        const sql = `
            SELECT U.ID, U.Email, U.F_Name, U.M_Name, U.L_Name, U.LastLogin, U.Role
            FROM USER U, SPSO S 
            WHERE (U.ID = S.ID) AND (U.Email = ?) AND (U.Password = ?);
        `;
        const [result] = await db.query(sql, [email, password]);
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function updateLastLoginSPSO(id) {
    try {
        const sql = `
            UPDATE USER
            SET LastLogin = now()
            WHERE ID = ?
        `;
        const [result] = await db.query(sql, [id]);
        return result;
    } catch (err) {
        throw err;
    }
}


// async function print() {
//     const result = await getSPSOByID(2252500);//.then(res => {
//     console.log(result);
// }

// print();


// const result2 = getSPSOByEmail('admin@hcmut.edu.vn', '123').then(res => {
//     if (res.length == 0) console.log('not found');
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

module.exports = {
    getSPSOByID, 
    getSPSOByEmail,
    updateLastLoginSPSO
}
