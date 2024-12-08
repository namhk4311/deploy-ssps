const printerDAO = require('../models/printer');

async function requestAdd(req, res, next) {
    try {
        const result = await printerDAO.addPrinter(req.body);
        if (result.affectedRows > 0) return res.json({Message: "Added Successfully"});
        return res.json({Message: "Add printer failed!"});
    } 
    catch (err) {
        next(err);
    }
}

async function requestDelete(req, res, next) {
    try {
        const result = await printerDAO.deletePrinter(req.params.id);
        if (result.affectedRows > 0) return res.json({Status: "Success"});
        return res.json({Status: "Failed"})
    }
    catch(err) {
        next(err);
    }
}

async function showAll(req, res, next) {
    try {
        const result = await printerDAO.showAllPrinter();
        if (result.length > 0) return res.json(result);
        return res.json({Message: "fetch all printer failed"});
    }
    catch (err) {
        next(err);
    }
}

async function enable(req, res, next) {
    try {
        const printerId = req.params.id;
        const result = await printerDAO.enablePrinter(printerId);
        if (result.affectedRows > 0) return res.json({Message: "Enable Successfully"})
        return res.json({Message: "Enable Failed"});
    }
    catch (err) {
        next(err);
    }
}


async function disable(req, res, next) {
    try {
        const printerId = req.params.id;
        const result = await printerDAO.disablePrinter(printerId);
        if (result.affectedRows > 0) return res.json({Message: "Disable Successfully"})
        return res.json({Message: "Disable Failed"});
    }
    catch (err) {
        next(err);
    }
}

async function updatePrinterInfo(req, res, next) {
    try {
        const result = await printerDAO.updatePrinter(req.body.id, req.body.data);
        if (result.affectedRows > 0) return res.json({Message: "Update Printer Successfully"});
        return res.json({Message: "Update Printer Failed"});
    }
    catch(err) {
        next(err);
    }
}

async function checkOnline(req, res, next) {
    try {
        const result = await printerDAO.checkPrinterOnline(req.params.id);
        if (result.length > 0) return res.json(result[0]);
        return res.json({Message: "Fetch printer status failed"})
    }
    catch (err) {
        next(err);
    }
}


// async function showPrinter(req, res, next) {
//     try {

//     }
//     catch (err)
// }

module.exports = {
    requestAdd,
    requestDelete,
    showAll,
    enable,
    disable,
    checkOnline,
    updatePrinterInfo
}