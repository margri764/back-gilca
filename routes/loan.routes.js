const { Router } = require ('express');
const { requireToken } = require('../middlewares/requireToken');
const { createLoan, getAllLoans, updateLoanById, getUserLoanById } = require('../controllers/loan.controllers');

const router = Router();

router.post('/:id',[
    requireToken
], createLoan);

router.get('/:id',[
    requireToken
], getUserLoanById)

router.put('/:id',[
    requireToken
], updateLoanById)

router.get('/',[
    requireToken
], getAllLoans)





module.exports= router;