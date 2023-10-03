const moment = require('moment');
const Loan = require('../models/loan');

const checkLoan = async (loans) => {

  try {
    // const loans = await Loan.find();
    
    for (const loan of loans) {
      const createdAtDate = moment(loan.createdAt);
      const currentDate = moment();
      const daysDifference = currentDate.diff(createdAtDate, 'days');
      
      if (daysDifference >= 30 && loan.status !== 'vencida') {
        loan.status = 'vencida';
        await loan.save();
        console.log(`El préstamo con ID ${loan._id} ha sido marcado como vencido.`);
      }
      return loans
    }
  } catch (error) {
    console.error('Error al verificar préstamos:', error);
  }
};

module.exports = checkLoan;