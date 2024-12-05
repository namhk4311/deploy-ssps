const printingDAO = require('../models/printOrder');

async function getDocumentByStudentID(req, res, next) {
    try {
        console.log(req.params.id);
        const result = await printingDAO.retrieveDocumentByStudentID(req.params.id);
        return res.json(result);
        // return res.json({Message: 'Fetch document failed'});
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    getDocumentByStudentID
}
