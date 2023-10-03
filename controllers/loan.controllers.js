
const {response} = require ('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const Loan = require('../models/loan');
const checkLoan = require('../helpers/check-expire-loan');


const createLoan = async (req, res=response)=>{

    try {

        
        const { ...rest } = req.body;
        const { id } = req.params;

        const user = await User.findById({_id:id}) || null;

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Cliente no encontrado en base de datos"
            })
        }else if(user.state === false ){
            return res.status(400).json({
                success: false,
                message: "Cliente eliminado de base de datos"
            })
        }
        // NO PUDE CREAR UN LOAN

        const tempLoan = {
            ...rest,
            user: user._id,

        }

        const loan = new Loan( tempLoan );
        await loan.save();

        res.status(200).json({
            success: true,
            message: "Prestamo generado con éxito"
        })


   } catch (error) {
     
    console.log('Error desde createLoan:', error);
    let errorMessage = 'Ups, algo salió mal. Por favor, contacta al administrador.';

      res.status(500).json({
          success: false,
          msg: errorMessage
      })       
    }
}

const updateLoanById = async (req, res=response)=>{

    try {

        const {  ...rest} = req.body;
        const { id } = req.params;
        const amount = req.query.amount;
        console.log(id);

        let loan = await Loan.findById({_id:id}) || null;

        if (!loan) {
            return res.status(400).json({
                success: false,
                message: "No existe ese prestamo en BD"
            });
        
        }else if(loan.status === "pagada"){
            return res.status(304).send();
        } 

        const amountInBack = loan.amount;

        console.log(amountInBack, amount);
        if(amountInBack == amount){
            loan = await Loan.findByIdAndUpdate(id, {status: "pagada", amount: 0, closedDate: new Date()}, {new:true});

        }else if(amountInBack >= amount){
            letTempAmount = amountInBack - amount;
            loan = await Loan.findByIdAndUpdate(id, { amount: letTempAmount}, {new:true})
        }else{
            return res.status(400).json({
                success: false,
                message: "No se puede ingresar un valor mayor al adeudado"
            })
        }

    
    
            res.json({ 
                success : true,
                loan
            });
            
        } catch (error) {
            console.log('Error desde updateLoanById:', error);
            let errorMessage = 'Ups, algo salió mal. Por favor, contacta al administrador.';
        
              res.status(500).json({
                  success: false,
                  msg: errorMessage
              })       
    }
    
}

const getLoanById = async (req, res=response) =>{

    try {
        // si al llamar a todas las ordenes hay una vencida deberia editarla con el "vencida"
        const { id } = req.params; 

        const loan = await Loan.find( {user: id} )
    
        res.status(200).json({
            success: true,
            loan
        })
        
            
        } catch (error) {
            console.log('Error desde getLoanById:', error);
            let errorMessage = 'Ups, algo salió mal. Por favor, contacta al administrador.';
        
              res.status(500).json({
                  success: false,
                  msg: errorMessage
              })       
    }


  

}

const getUserLoanById = async (req, res=response) =>{

    try {
        // si al llamar a todas las ordenes hay una vencida deberia editarla con el "vencida"
        const { id } = req.params; 

        const loan = await Loan.find( {user: id} ).populate( "user" )

        if(!loan){
            return res.status(400).json({
                success: false,
                message: "No se encuentran prestamos"
            })
        }
    
        res.status(200).json({
            success: true,
            loan
        })
        
            
        } catch (error) {
            console.log('Error desde getLoanById:', error);
            let errorMessage = 'Ups, algo salió mal. Por favor, contacta al administrador.';
        
              res.status(500).json({
                  success: false,
                  msg: errorMessage
              })       
    }


  

}


const getAllLoans = async (req, res=response) =>{


    try {

        let loans = await Loan.find( {status : "pendiente"} ) ;
        loans = await checkLoan(loans);

        res.json({ 
            success : true,
            loans
        });
            
        } catch (error) {
            console.log('Error desde getAllLoans:', error);
            let errorMessage = 'Ups, algo salió mal. Por favor, contacta al administrador.';
        
              res.status(500).json({
                  success: false,
                  msg: errorMessage
              })       
    }

}



module.exports={
                createLoan,
                getLoanById,
                getAllLoans,
                updateLoanById,
                getUserLoanById
              }

