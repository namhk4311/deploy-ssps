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

async function updateNewOrder(data) {
    const {numCopies, printingColor, pageSide, typePage, sizePage, studentID, documentID} = data;
    try {
        const sql = `
            INSERT INTO PRINT_ORDER (Start_time, End_time, Cancel_time, Number_of_copies, Printing_color, Page_side, Type_of_page, Size_of_page, studentID, DocumentID)
            VALUES 
            (now(), date_add(now(), interval 2 minute), null, ?, ?, ?, ?, ?, ?, ?);       
        `
        const [result] = await db.query(sql, [numCopies, printingColor, pageSide, typePage, sizePage, studentID, documentID]);
        return result;
    }
    catch (err) {
        throw err;
    }
}

// async function print() {
//     const data = {
//         numCopies: 1, 
//         printingColor: 'Black and White', 
//         pageSide: 'Double-sided', 
//         typePage: 'A4', 
//         sizePage: 'Letter', 
//         studentID: 2252500, 
//         documentID: 9
//     }
//     const result = await updateNewOrder(data);
//     console.log(result);
// }

// print();

module.exports = {
    retrieveDocumentByStudentID,
    updateNewOrder
}