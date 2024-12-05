const db = require('../database/db');

async function retrieveDocumentByStudentID(studentID) {
    try {
        const sql = `
            SELECT * 
            FROM PRINT_ORDER P, DOCUMENT D
            WHERE (P.DocumentID = D.DocumentID) AND (P.studentID = ?)
        `;
        const [result] = await db.query(sql, [studentID]);
        return result;
    }
    catch (err) {
        throw err;
    }
}

// async function print() {
//     const result = await retrieveDocumentByStudentID(2252500);
//     console.log(result);
// }

// print();

module.exports = {
    retrieveDocumentByStudentID
}