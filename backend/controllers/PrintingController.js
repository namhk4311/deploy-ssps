const printingDAO = require('../models/printOrder');
const documentDAO = require('../models/document');

async function getDocumentByStudentID(req, res, next) {
    try {
        // console.log(req.params.id);
        const result = await printingDAO.retrieveDocumentByStudentID(req.params.id);
        // console.log('he');
        return res.json(result);
        // return res.json({Message: 'Fetch document failed'});
    }
    catch (err) {
        next(err);
    }
}

async function retrieveAllDocumentOrder(req, res, next) {
    try {
        const result = await documentDAO.showAllDocument();
        if (result.length > 0) return res.json(result);
        return res.json({Message: 'Fetch All Document failed'});

    }
    catch(err) {
        next(err);
    }
}

module.exports = {
    getDocumentByStudentID,
    retrieveAllDocumentOrder
}
