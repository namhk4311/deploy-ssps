const db = require('../database/db');

async function showAllDocument() {
    try {
        const sql = `
            SELECT D.DocumentID, D.Name, D.Format, D.Number_of_pages, P.End_time
            FROM document D, print_order P
            WHERE (D.DocumentID = P.DocumentID) AND (P.End_time IS NOT NULL); 
        `;
        const [result] = await db.query(sql);
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function retrieveLatestDocumentID() {
    try {
        const sql = `
            SELECT DocumentID FROM DOCUMENT ORDER BY DocumentID DESC LIMIT 1;
        `;
        const [result] = await db.query(sql);
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function addNewPrintingDocument(data) {
    try {
        const {Name, Format, Number_of_pages, PrID} = data;
        const sql = `
            INSERT INTO DOCUMENT(Name, Format, Number_of_pages, PrID)
            VALUES
            (?, ?, ?, ?);
        `;
        const [result] = await db.query(sql, [Name, Format, Number_of_pages, PrID]);
        return result;
    }
    catch(err) {
        throw err;
    }
}

// async function print() {
//     const result = await retrieveLatestDocumentID();
//     console.log(result);
// }
// print();



module.exports = {
    showAllDocument,
    retrieveLatestDocumentID,
    addNewPrintingDocument
}