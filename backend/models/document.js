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

async function print() {
    const result = await showAllDocument();
    console.log(result);
}
// print();


module.exports = {
    showAllDocument
}