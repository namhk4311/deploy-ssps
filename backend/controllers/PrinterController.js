const printerDAO = require('../models/printer');

async function requestAdd(req, res, next) {
    try {
        const result = await printerDAO.addPrinter(req.body.data);
        if (result.affectedRows > 0) return res.json({Message: "Added Successfully"});
        return res.json({Message: "Add printer failed!"});
    } 
    catch (err) {
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


// async function showPrinter(req, res, next) {
//     try {

//     }
//     catch (err)
// }

module.exports = {
    requestAdd,
    showAll,
    enable,
    disable
}