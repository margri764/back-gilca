
const {response} = require ('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const Staff = require('../models/staff');
const { generateToken } = require('../helpers/tokenManager');
const { checkUserEmail } = require('../helpers/check-user-type');


const login = async (req, res=response)=>{

    try {

        const {email, password} = req.body;

        const user = await checkUserEmail(email);

  
        const checkPassword = bcryptjs.compareSync(password, user.password)
        if(!checkPassword){
            return res.status(403).json({
                message: "Credenciales invalidas."
            })
        }

        const token = await generateToken(user._id);
       
         return res.status(200).json({
            success: true,
            token,
            user
        })


   } catch (error) {
     
    console.log('Error desde Login:', error);
    let errorMessage = 'Ups, algo salió mal. Por favor, contacta al administrador.';
{
    }


      res.status(500).json({
          success: false,
          msg: errorMessage
      })       
    }
}



const signUp = async (req, res=response) => {

    try {

        const { email, password, ...rest} = req.body;

       
        let user = await User.findOne({ email : email }) || null;
       if(user){
       
        return res.status(400).json({
            success: false,
            msg: 'Existe un usuario con ese email',
        });
    }
        
        const randomDigits = Math.floor(1000 + Math.random() * 9000);

        const clientNumber = `NREV${randomDigits}`;
       
        user = new User({email, password, clientNumber, ...rest});
        
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password,salt);

        await user.save();
       
    res.status(200).json({
        success: true,
        user
    });

    } catch (error) {
        console.log("error desde signUp: ",error);
        return res.status(500).json({
            success: false,
            msg: 'Ups algo salió mal, hable con el administrador'
        });
    }
}
  
const createStaff = async (req, res=response) => {

    try {

        const { email, password, ...rest} = req.body;

       
        let staff = await Staff.findOne({ email : email }) || null;
       if(staff){
       
        return res.status(400).json({
            success: false,
            msg: 'Existe un usuario con ese email',
        });
    }
        
        staff = new Staff({email, password, ...rest});
        
        const salt = bcryptjs.genSaltSync();
        staff.password = bcryptjs.hashSync(password,salt);

        await staff.save();
       
    res.status(200).json({
        success: true,
        staff
    });

    } catch (error) {
        console.log("error desde createStaff: ",error);
        return res.status(500).json({
            success: false,
            msg: 'Ups algo salió mal, hable con el administrador'
        });
    }
}
  

module.exports={
                 login,
                 signUp,
                 createStaff
              }

