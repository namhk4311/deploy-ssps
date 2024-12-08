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

async function retrieveTotalOrderByStudentID(studentID) {
    try {
        const sql = `
            SELECT COUNT(*) AS totalOrder
            FROM PRINT_ORDER
            WHERE studentID = ?;
        `;
        const [result] = await db.query(sql, [studentID]);
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function retrieveTotalPagePrintedByID(studentID) {
    try {
        const sql = `
            CALL CalculateTotalPagesPrinted(?);
        `;
        const [[result]] = await db.query(sql, [studentID]);
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function updateNewOrder(data) {
    const {numCopies, printingColor, pageSide, sizePage, layout, oddEven, studentID, documentID} = data;
    try {
        const sql = `
            INSERT INTO PRINT_ORDER (Start_time, End_time, Cancel_time, Number_of_copies, Printing_color, Page_side, Size_of_page, layout, oddEven, studentID, DocumentID)
            VALUES 
            (now(), date_add(now(), interval 1 minute), null, ?, ?, ?, ?, ?, ?, ?, ?);       
        `
        const [result] = await db.query(sql, [numCopies, printingColor, pageSide, sizePage, layout, oddEven, studentID, documentID]);
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function print() {
    // const data = {
    //     numCopies: 1, 
    //     printingColor: 'Black and White', 
    //     pageSide: 'Double-sided', 
    //     typePage: 'A4', 
    //     sizePage: 'Letter', 
    //     studentID: 2252500, 
    //     documentID: 9
    // }
    // const result = await updateNewOrder(data);


    const result = await retrieveTotalPagePrintedByID(2252500);
    console.log(result);
}

// print();

module.exports = {
    retrieveDocumentByStudentID,
    retrieveTotalOrderByStudentID,
    retrieveTotalPagePrintedByID,
    updateNewOrder
}