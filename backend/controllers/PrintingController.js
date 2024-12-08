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

async function getTotalNumberOrderByID(req, res, next) {
    try {
        const result = await printingDAO.retrieveTotalOrderByStudentID(req.params.id);
        if (result.length > 0) return res.json(result[0])
        return res.json({Message: "Get Total Order failed"});
    }
    catch (err) {
        next(err);
    }
}

async function getTotalNumberPageByID(req, res, next) {
    try {
        const result = await printingDAO.retrieveTotalPagePrintedByID(req.params.id);
        if (result.length > 0) return res.json(result[0]);  
        return res.json({Message: "Get total page failed"});
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

async function AddingPrintingOrder(req, res, next) {
    try {
        const dataDoc = {
            Name: req.body.Name, 
            Format: req.body.Format,
            Number_of_pages: req.body.Number_of_pages,
            PrID: req.body.PrID
        }
        await documentDAO.addNewPrintingDocument(dataDoc);

        const result1 = await documentDAO.retrieveLatestDocumentID();
        console.log(result1[0]);
        if (result1.length > 0) {
            const dataOrder = {
                numCopies: req.body.order.numCopies, 
                printingColor: req.body.order.printingColor, 
                pageSide: req.body.order.pageSide,  
                sizePage: req.body.order.sizePage, 
                layout: req.body.order.layout,
                oddEven: req.body.order.oddEven,
                studentID: req.body.order.studentID, 
                documentID: result1[0].DocumentID
            }
            const result2 = await printingDAO.updateNewOrder(dataOrder);
            if (result2.affectedRows > 0) return res.json({Message: "Adding new printing order successfully"});
            return res.json({Message: "Adding new printing order failed"});
        }
        return res.json({Message: "There are no document in database"})
    }
    catch (err) {
        next(err);
    }
}

module.exports = {
    getDocumentByStudentID,
    retrieveAllDocumentOrder,
    getTotalNumberOrderByID,
    getTotalNumberPageByID,
    AddingPrintingOrder
}
