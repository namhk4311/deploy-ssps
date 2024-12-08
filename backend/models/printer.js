const { checkOnline } = require('../controllers/PrinterController');
const db = require('../database/db');

async function enablePrinter(printerID) {
    try {
        const sql = `
            UPDATE PRINTER
            SET Status = 'Available'
            WHERE PrID = ?
        `;

        const [result] = await db.query(sql, [printerID]);
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function disablePrinter(printerID) {
    try {
        const sql = `
            UPDATE PRINTER
            SET Status = 'Out of Service'
            WHERE PrID = ?
        `;
        const [result] = await db.query(sql, [printerID]);
        return result;

    }
    catch (err) {
        throw err;
    }
}

async function showAllPrinter() {
    try {
        const sql =  `
            SELECT * FROM PRINTER;
        `;
        const [result] = await db.query(sql);
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function addPrinter(data) {
    const {
        Campus,
        Building,
        Floor,
        Model,
        Short_description,
        Brand
    } = data;
    try {
        const sql = `
            INSERT INTO PRINTER (Campus, Building, Floor, Model, Short_description, Brand)
            VALUES (?, ?, ?, ?, ?, ?);
        `;
        const [result] = await db.query(sql, [Campus, Building, Floor, Model, Short_description, Brand]);
        return result;
    } 
    catch (err) {
        throw err;
    }
}

async function checkPrinterOnline(PrID) {
    try {
        const sql = `
            SELECT Status
            FROM PRINTER
            WHERE PrID = ?;
        `;
        const [result] = await db.query(sql, [PrID]);
        return result;
    }
    catch (err) {
        throw err;
    }
}

async function updatePrinter(PrID, data) {
    const {
        Campus,
        Building,
        Floor,
        Model,
        Short_description,
        Brand
    } = data;
    try {
        const sql = `
            UPDATE PRINTER
            SET Campus = ?, Building = ?, Floor = ?, Model = ?, Short_description = ?, Brand = ?
            WHERE PrID = ?;
        `;
        const [result] = await db.query(sql, [Campus, Building, Floor, Model, Short_description, Brand, PrID]);
        return result;
    } 
    catch (err) {
        throw err;
    }
}

async function deletePrinter(PrID) {
    try {
        const sql = `
            DELETE FROM PRINTER WHERE PrID = ?
        `;
        const [result] = await db.query(sql, [PrID]);
        return result;
    }
    catch (err) {
        throw err;
    }
}


async function print() {
    // const data = {
    //     "Campus": "1",
    //     "Building": "B8",
    //     "Floor": "305",
    //     "Model": "Canon AC",
    //     "Short_description": "None",
    //     "Brand": "HP"
    // }

    // // const result5 = await addPrinter(data);

    // // await updatePrinter(5, data);
    // const result5 = await enablePrinter(1);
    // // await deletePrinter(5);

    const result = await checkPrinterOnline(1);
    console.log(result);
}

// print();


module.exports = {
    enablePrinter,
    disablePrinter,
    showAllPrinter,
    addPrinter,
    updatePrinter,
    deletePrinter,
    checkPrinterOnline
};